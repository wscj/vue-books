const cmpBook = {
  data () {
    return {
      tableData: []
    }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleRead(index, row) {
      console.log(index, row);
    }
  },
  template: `<el-table
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
    </el-table>`,
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