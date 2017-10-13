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
      fullscreenLoading: false
    }
  },
  methods: {
    handleEdit(index, row) {
      this.form.name = row.name
      this.form.category = row.category
      this.row = row
      this.dialogFormVisible = true
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    handleRead(index, row) {
      this.$router.push({ path: '/books', query: { id: row.rowid } })
    },
    edit() {
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
          }, 1200)
        },
        resp => {
          this.fullscreenLoading = false
        }
      )
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
      <el-dialog title="修改书信息" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="书名" :label-width="formLabelWidth">
            <el-input v-model="form.name" auto-complete="off" cls="book-list-name"></el-input>
          </el-form-item>
          <el-form-item label="分类" :label-width="formLabelWidth">
            <el-select v-model="form.category" placeholder="请选择活动区域" cls="book-list-name">
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
            @click="edit()" 
            v-loading.fullscreen.lock="fullscreenLoading"
            element-loading-text="正在保存">确 定</el-button>
        </div>
      </el-dialog>
    </div>`
}