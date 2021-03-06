const cmpBookList = {
  data () {
    return {
      tableData: [],
      dialogFormVisible: false,
      form: {
        name: '',
        category: '',
        rowid: 0
      },
      formLabelWidth: '120px',
      row: {},
      fullscreenLoading: false,
      dialogVisible: false,
      loadingText: '',
      action: ''
    }
  },
  methods: {
    handleEdit(index, row) {
      this.action = '保存修改'
      this.dialogFormVisible = true
      this.form.name = row.name
      this.form.category = row.category
      this.row = row
    },
    handleDelete(index, row) {
      this.dialogVisible = true
      this.row = row
    },
    handleRead(index, row) {
      this.$router.push({ path: '/books', query: { id: row.rowid } })
    },
    editBook() {
      if (this.verify()) return
      this.loadingText = '正在保存'
      this.fullscreenLoading = true
      const param = { name: this.form.name, category: this.form.category }
      this.$http.patch('/api/books/' + this.row.rowid, param).then(
        resp => {
          //故意延迟，加载loading动画更生动
          setTimeout(() => {
            this.fullscreenLoading = false
            this.dialogFormVisible = false
            this.row.name = this.form.name
            this.row.category = this.form.category
            this.$message({
              message: '修改成功',
              type: 'success'
            });
          }, 1200)
        },
        resp => {
          this.fullscreenLoading = false
        }
      )
    },
    deleteBook() {
      this.loadingText = '删除中'
      this.fullscreenLoading = true
      this.dialogVisible = false
      this.$http.delete('/api/books/' + this.row.rowid).then(
        resp => {
          //故意延迟，加载loading动画更生动
          setTimeout(() => {
            this.fullscreenLoading = false
            this.tableData
            for (let i = 0; i < this.tableData.length; i++) {
              if (this.tableData[i].rowid === this.row.rowid) {
                this.tableData.splice(i, 1)
                break
              }
            }
            this.$message({
              message: '删除成功',
              type: 'success'
            });
          }, 1200)
        }
      )
      // this.dialogVisible = false
    },
    handleAdd() {
      this.action = '确定新增'
      this.dialogFormVisible = true
      this.form.name = ''
      this.form.category = ''
    },
    save() {
      this.action === '保存修改' ? this.editBook() : this.addBook()
    },
    addBook() {
      if (this.verify()) return
      this.loadingText = '正在保存'
      this.fullscreenLoading = true
      const param = { name: this.form.name, category: this.form.category }
      this.$http.post('/api/books', param).then(
        resp => {
          //故意延迟，加载loading动画更生动
          setTimeout(() => {
            this.fullscreenLoading = false
            this.dialogFormVisible = false
            this.tableData.push({
              name: this.form.name,
              category: this.form.category
            })
            this.$message({
              message: '新增成功',
              type: 'success'
            });
          }, 1200)
        },
        resp => {
          this.fullscreenLoading = false
        }
      )
    },
    verify() {
      this.form.name = this.form.name.trim()
      this.form.category = this.form.category.trim()
      if (this.form.name === '') {

        this.$message({
          message: '书名不能为空',
          type: 'error'
        });
        return true
      }
      if (this.form.category === '') {
        this.form.category === '' && this.$message({
          message: '分类不能为空',
          type: 'error'
        });
        return true
      }
      return false
    }
  },
  created () {
    this.$http.get('/api/books').then(
      resp => {
        this.tableData = resp.body.list
      },
      resp => {
        console.error('fail')
      }
    )
  },
  template: 
    `<div>
      <el-button type="text" class="add-book" @click="handleAdd()">新增</el-button>
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="name"
          label="书名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="category"
          label="分类"
          width="180">
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button
              size="small"
              @click="handleRead(scope.$index, scope.row)">查看</el-button>
            <el-button
              size="small"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="书本信息" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="书名" :label-width="formLabelWidth">
            <el-input v-model="form.name" auto-complete="off" cls="book-list-name"></el-input>
          </el-form-item>
          <el-form-item label="分类" :label-width="formLabelWidth">
            <el-select v-model="form.category" placeholder="请选择分类" cls="book-list-name">
              <el-option label="文学" value="文学"></el-option>
              <el-option label="古代文学" value="古代文学"></el-option>
              <el-option label="自然科学" value="自然科学"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button 
            type="primary" 
            @click="save()" 
            v-loading.fullscreen.lock="fullscreenLoading"
            :element-loading-text="loadingText">{{ action }}</el-button>
        </div>
      </el-dialog>
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        size="tiny">
        <span>确定删除？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="deleteBook()">确 定</el-button>
        </span>
      </el-dialog>
    </div>`
}