<!--
 * @Author: your name
 * @Date: 2019-10-29 08:54:31
 * @LastEditTime: 2019-11-11 09:32:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \nuxt_demo2\pages\index\table.vue
 -->
<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 基础表格
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-button
          type="primary"
          icon="el-icon-delete"
          class="handle-del mr10"
          @click="delAllSelection"
        >批量删除</el-button>
        <el-select v-model="selectCate" placeholder="筛选省份" class="handle-select mr10">
          <el-option key="1" label="广东省" value="广东省"></el-option>
          <el-option key="2" label="湖南省" value="湖南省"></el-option>
        </el-select>
        <el-input v-model="selectWord" placeholder="筛选关键词" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
      </div>
      <el-table
        :data="users"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="_id" label="ID" align="center"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column label="性别">
          <template slot-scope="scope">{{scope.row.sex=='female'?'女':'男'}}</template>
        </el-table-column>
        <el-table-column prop="tel" label="电话" align="center"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="createAt" label="注册时间" align="center" :formatter="formatDate"></el-table-column>

        <el-table-column prop="lastLoginAt" label="登录时间" :formatter="formatDate"></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          layout="total, prev, pager, next"
          :current-page="page.index"
          :page-size="page.size"
          :total="page.total"
          @current-change="handlePageChange"
        ></el-pagination>
      </div>
    </div>

    <!-- 编辑弹出框 -->
    <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
      <el-form ref="form" :model="form" label-width="70px">
        <el-form-item label="用户名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="form.sex">
            <el-radio label="male">男</el-radio>
            <el-radio label="female">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="form.tel"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import moment from "moment";
import axios from 'axios'
export default {
  name: "basetable",
  data() {
    return {
      users: [],
      multipleSelection: [],
      delList: [],
      selectCate: "",
      selectWord: "",
      editVisible: false,
      page: {
        index: 1,
        size: 10,
        total: 50
      },
      form: {},
      idx: -1,
      id: -1
    };
  },
  // created() {
  //   this.getData();
  // },
  // computed: {
  //   data() {
  //     return this.tableData.filter(d => {
  //       let is_del = false;
  //       for (let i = 0; i < this.delList.length; i++) {
  //         if (d.name === this.delList[i].name) {
  //           is_del = true;
  //           break;
  //         }
  //       }
  //       if (!is_del) {
  //         if (
  //           d.address.indexOf(this.selectCate) > -1 &&
  //           (d.name.indexOf(this.selectWord) > -1 ||
  //             d.address.indexOf(this.selectWord) > -1)
  //         ) {
  //           return d;
  //         }
  //       }
  //     });
  //   }
  // },
  async asyncData({ $axios }) {
    const res = await $axios.get("/api/users");
    const res2 = await $axios.get("/api/users/page/1", {
      params: {
        pageSize: 5
      }
    });

    // console.log('userlist', res.data.data)
    // console.log('userpagelist', res2.data.data)
    return {
      users: res2.data.data,
      page: {
        total: res.data.data.length,
        size: 5,
        index: 1
      }
    };
  },
  methods: {
    formatDate(row, column, cellValue, index) {
      return moment(cellValue).format("YYYY-MM-DD");
    },
    async getData(index) {
      // axios.get("/api/users").then(res => {
      //   console.log(res);
      //   if (res.data.result === "success") {
      //     this.tableData = res.data.data;
      //   }
      // });
      const res = await this.$axios.get("/api/users");
      const res2 = await this.$axios.get("/api/users/page/" + index, {
        params: {
          pageSize: 5
        }
      });
      this.users = res2.data.data;
      this.page = {
        total: res.data.data.length,
        size: 5,
        index: index || 1
      };
    },
    // 分页导航
    handlePageChange(val) {
      // this.page.index = val
      // console.log(val)
      this.getData(val);
    },
    // 触发搜索按钮
    handleSearch() {},
    // 删除操作
    handleDelete(index, row) {
      const self = this;
      // 二次确认删除
      this.$confirm("确定要删除吗？", "提示", {
        type: "warning"
      })
        .then(() => {
          axios.delete(`/api/users/${row._id}`).then(res => {
              // console.log(res.data.result === "success");
              // console.log(res);
              if (res.data.result === "success") {
                self.$message.success("删除成功");
                self.users.splice(index, 1);
              }
            })
            .catch((error) => {console.log("删除失败");
            });
        })
        .catch((error) => {console.log(error)});
    },
    // 多选操作
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    delAllSelection() {
      const length = this.multipleSelection.length;
      let str = "";
      this.delList = this.delList.concat(this.multipleSelection);
      for (let i = 0; i < length; i++) {
        str += this.multipleSelection[i].name + " ";
      }
      this.$message.error(`删除了${str}`);
      this.multipleSelection = [];
    },
    // 编辑操作
    handleEdit(index, row) {
      this.idx = index;
      this.id = row.id;
      this.form = row;
      this.editVisible = true;
    },
    // 保存编辑
    saveEdit() {
      this.editVisible = false;

      this.$axios.put("api/users", this.form).then(() => {
        this.$message.success(`修改第 ${this.idx + 1} 行成功`);
        this.$set(this.users, this.idx, this.form);
      });
    }
  }
};
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
}
.mr10 {
  margin-right: 10px;
}
.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}
</style>
