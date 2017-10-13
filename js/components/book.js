const cmpBook = {
  data () {
    return {
      tableData: []
    }
  },
  methods: {
    back() {
      this.$router.back()
    }
  },
  template: 
    `<div>
      <el-button type="text" class="back-to-book-list" @click="back()">返回书列表</el-button>
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="title"
          label="文章标题"
          width="180">
        </el-table-column>
        <el-table-column
          prop="author"
          label="作者"
          width="180">
        </el-table-column>
        <el-table-column
          prop="content"
          label="内容">
        </el-table-column>
      </el-table>
    </div>`,
  created () {
    this.$http.get(`/api/books/${this.$route.query.id}/articles`).then(
      resp => {
        this.tableData = resp.body.list
      },
      resp => {
        console.error('fail')
      }
    )
  }
}