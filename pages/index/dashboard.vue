<template>
  <div>
    <el-row :gutter="20" class="mgb20">
      <el-col :span="8">
        <el-card shadow="hover" class="mgb20" style="height:260px;">
          <div class="user-info">
            <img src="~/assets/img/img.jpg" class="user-avator" />
            <div class="user-info-cont">
              <div class="user-info-name">{{ authUser }}</div>
              <div>{{ role }}</div>
            </div>
          </div>
          <div class="user-info-list">
            上次登录时间：
            <span>2018-01-01</span>
          </div>
          <div class="user-info-list">
            上次登录地点：
            <span>重庆</span>
          </div>
        </el-card>
        <el-card shadow="hover" style="height:260px;">
          <div slot="header" class="clearfix">
            <span>旅游景点热度</span>
            <el-button style="float: right; padding: 3px 0" type="text">更多</el-button>
          </div>
          <div class="mgb10">
            故宫
            <el-progress :percentage="71.3" color="#42b983"></el-progress>
          </div>
          <div class="mgb10">
            北海
            <el-progress :percentage="24.1" color="#f1e05a"></el-progress>
          </div>
          <div class="mgb10">
            重庆
            <el-progress :percentage="3.7"></el-progress>
          </div>
          <div class="mgb10">
            上海
            <el-progress :percentage="0.9" color="#f56c6c"></el-progress>
          </div>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-row :gutter="20" class="mgb20">
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
              <div class="grid-content grid-con-1">
                <i class="el-icon-custom-people grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">1234</div>
                  <div>用户访问量</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
              <div class="grid-content grid-con-2">
                <i class="el-icon-custom-order grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">21</div>
                  <div>评论数量</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
              <div class="grid-content grid-con-3">
                <i class="el-icon-custom-goods grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">5130</div>
                  <div>文章数量</div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-card shadow="hover" style="height:420px;">
          <div slot="header" class="clearfix">
            <span>最新文章</span>
            <el-button style="float: right; padding: 3px 0" type="text">更多</el-button>
          </div>
          <el-table :data="commentList" :show-header="false" style="width: 100%;font-size:14px;">
            <el-table-column width="250" prop="_id"></el-table-column>
            <el-table-column prop="title"></el-table-column>
            <el-table-column  width="170">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  icon="el-icon-edit"
                  @click="handleEdit(scope.$index, scope.row)"
                >编辑</el-button>
                <el-button
                  type="text"
                  icon="el-icon-delete"
                  class="btn_red"
                  @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <!-- <el-row :gutter="20">
      <el-col :span="12">
        <el-card shadow="hover">
          <my-chart />
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover">
          <my-chart />
        </el-card>
      </el-col>
    </el-row>-->
  </div>
</template>
<script>
// import myChart from '~/components/MyChart'
export default {
  name: "Dashboard",
  components: {
    // myChart
  },
  data() {
    return {
      authUser: "冉林",
      commentList: [ ]
    };
  },
  computed: {
    role() {
      // console.log(this.authUser)
      return this.authUser.type === "administrator" ? "管理员" : "普通用户";
    }
  },
  asyncData({$axios}) {
     return $axios.get('/api/article').then(res => {
       console.log(res.data.data);
       return{commentList : res.data.data}
     })
  },
  methods: {
    handleEdit(){
      this.$router.push('/articleList')
    }
  }
};
</script>
<style lang="scss" scoped>
.mgb20 {
  margin-bottom: 20px;
}
.mgb10 {
  margin-bottom: 10px;
}
.user-info {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
  .user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
  }
  .user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
  }

  .user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
  }

  .user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
  }

  .user-info-list span {
    margin-left: 70px;
  }
}
.grid-content {
  display: flex;
  align-items: center;
  height: 100px;
}

.grid-cont-right {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #999;
}

.grid-num {
  font-size: 30px;
  font-weight: bold;
}

.grid-con-icon {
  font-size: 50px;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  color: #fff;
}

.grid-con-1 .grid-con-icon {
  background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
  background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
  background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
  color: rgb(242, 94, 67);
}
.btn_red {
  color: #ff0000;
}
</style>
