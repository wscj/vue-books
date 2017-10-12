const cmpBookList = {
  data () {
    return {
      tableData: [],
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    handleEdit(index, row) {
      this.dialogFormVisible = true
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    handleRead(index, row) {
      this.$router.push({ path: '/books', query: { id: row.rowid } })
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
            <el-select v-model="form.region" placeholder="请选择活动区域" cls="book-list-name">
              <el-option label="文学" value="wenxue"></el-option>
              <el-option label="古代文学" value="gudaiwenxue"></el-option>
              <el-option label="自然科学" value="zirankexue"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>`
}