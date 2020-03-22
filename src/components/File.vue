<template>
<el-container>
  <el-header></el-header>
  <el-main>
    <div class="hello">
    <el-row>
      <el-col :span="8">
        <br />
      </el-col>
      <el-col :span="8">
        <el-upload
          class="upload-demo"
          drag
          action="http://localhost:8080/web/rest/common/file/v1/upload"
          multiple
          :on-success="handleAvatarSuccess"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
        </el-upload>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple"></div>
      </el-col>
    </el-row>
    <br />
    <el-row>
      <el-col :span="2">
        <br />
      </el-col>
      <el-col :span="20">
        <!-- <el-table :data="tableData" border>
          <el-table-column prop="id" label="id" width="220"></el-table-column>
          <el-table-column prop="name" label="姓名" width="220"></el-table-column>
          <el-table-column prop="length" label="大小" width="112"></el-table-column>
          <el-table-column prop="fileType" label="类型" width="100"></el-table-column>
          <el-table-column prop="md5" label="md5" width="220"></el-table-column>
          <el-table-column prop="operate" label="操作" width="280">
            <el-button type="primary" @click="downLoadFile(tableData.row.id)">下载</el-button>
            <el-button type="warning" @click="previewFile">预览</el-button>
            <el-button type="danger" @click="deleteFile">删除</el-button>
          </el-table-column>
        </el-table>-->
        <el-table
          v-loading="loading"
          :data="tableData"
          element-loading-text="Loading"
          border
          fit
          highlight-current-row
        >
          <el-table-column label="id" width="220" align="center">
            <template slot-scope="scope">{{ scope.row.id }}</template>
          </el-table-column>
          <el-table-column label="name" width="290" align="center">
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="handleClickName(scope.row.id,scope.row.name)"
              >{{ scope.row.name }}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="md5" width="300" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.md5 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="type" width="110" align="center">
            <template slot-scope="scope">{{ scope.row.fileType }}</template>
          </el-table-column>
          <el-table-column class-name="status-col" label="size" width="110" align="center">
            <template slot-scope="scope">{{ scope.row.length }}</template>
          </el-table-column>
          <el-table-column class-name="status-col" label="操作" width="110" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="handleDownloadFile(scope.row.id)">下载</el-button>
              <el-button type="text" @click="handleDeleteFile(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="2"></el-col>
    </el-row>
  </div>
  </el-main>
  <el-footer class="el-footer">dfo-Dist File Operator</el-footer>
</el-container>
  
</template>

<script>
export default {
  name: "File",
  props: {
    msg: String
  },
  mounted() {
    this.fetchData();
  },
  data() {
    return {
      loading: true,
      fileList: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        },
        {
          name: "food2.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        }
      ],
      tableData: []
    };
  },
  methods: {
    fetchData() {
      this.$axios
        .get("http://localhost:8082/dfo/rest/common/file/v1/all")
        .then(response => {
          this.tableData = response.data.data;
          this.loading = false;
        })
        .catch(response => {
          console.log(response);
        });
    },
    handleClickName(fileId, fileName) {
      window.open(
        "http://localhost:8082/dfo/rest/common/file/v1/preview/" +
          fileId +
          "/" +
          fileName +
          "",
        "_blank"
      );
    },
    handleDownloadFile(fileId) {
      // downFile(fileId).then(response);
      window.location.href =
        "http://localhost:8082/dfo/rest/common/file/v1/" + fileId + "";
    },
    handleDeleteFile(fileId) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .delete("http://localhost:8082/dfo/rest/common/file/v1/" + fileId)
            .then(response => {
              // this.tableData = response.data.data;
              if (response.data.code == 1000) {
                this.$message({
                  message: "文件删除成功",
                  type: "success"
                });
              }
              //重载数据
              this.fetchData();
            })
            .catch(response => {
              console.log(response);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleAvatarSuccess(res) {
      //this.imageUrl = URL.createObjectURL(file.raw);
      if (res.code == 1000) {
        this.$message({
          message: "文件上传成功",
          type: "success"
        });
      }
      this.fetchData();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
</style>
