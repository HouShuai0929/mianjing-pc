<template>
  <div class="article-page">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>面经后台</el-breadcrumb-item>
      <el-breadcrumb-item>面经管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card shadow="never" border="false">
      <template #header>
        <div class="header">
          <span>共 300 条记录</span>
          <el-button
            @click="showDrawer('add')"
            icon="el-icon-plus"
            size="small"
            type="primary"
            round
          >
            添加面经
          </el-button>
        </div>
      </template>
      <el-table :data="list" style="width: 100%">
        <el-table-column prop="stem" label="标题" width="200">
        </el-table-column>
        <el-table-column prop="creator" label="作者"> </el-table-column>
        <el-table-column prop="likeCount" label="点赞"> </el-table-column>
        <el-table-column prop="views" label="浏览数"> </el-table-column>
        <el-table-column prop="createdAt" label="更新时间" width="200">
        </el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <div class="actions">
              <i
                class="el-icon-view"
                @click="showDrawer('preview', row.id)"
              ></i>
              <i
                class="el-icon-edit-outline"
                @click="showDrawer('edit', row.id)"
              ></i>
              <i class="el-icon-delete" @click="deleteArtile(row.id)"></i>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleCurrentChange"
        background
        :current-page="current"
        :page-size="pageSize"
        layout="prev, pager, next"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <el-drawer
      :visible.sync="isShowDrawer"
      :title="title"
      direction="rtl"
      size="50%"
      @close="drawerClose()"
    >
      <div v-if="type === 'preview'" class="article-preview">
        <h5>{{ form.stem }}</h5>
        <div v-html="form.content"></div>
      </div>
      <el-form
        v-if="aaa"
        :model="form"
        :rules="rules"
        ref="formRef"
        label-width="80px"
      >
        <el-form-item label="标题" prop="stem">
          <el-input v-model="form.stem"></el-input>
        </el-form-item>

        <el-form-item label="内容" prop="content">
          <quill-editor
            v-model="form.content"
            @blur="$refs.formRef.validateField('content')"
          ></quill-editor>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submit">确认</el-button>
          <el-button @click="isShowDrawer = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
import {
  getArticleList,
  addArticle,
  getArticleDetail,
  removeArticle,
  editArticle,
} from "@/api/article";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";
export default {
  name: "article-page",
  components: {
    quillEditor,
  },
  computed: {
    title() {
      return this.type === "add"
        ? "添加面经"
        : this.type === "edit"
        ? "修改面经"
        : "面经预览";
    },
  },
  data() {
    return {
      list: [],
      current: 1,
      pageSize: 10,
      total: 0,
      isShowDrawer: false,
      aaa: true,
      form: {
        stem: "",
        content: "",
      },
      rules: {
        stem: [
          {
            required: true,
            message: "请输入文章标题",
            trigger: "blur",
          },
        ],
        content: [
          {
            required: true,
            message: "请输入文章内容",
            trigger: "blur",
          },
        ],
      },
      type: "",
    };
  },

  async created() {
    this.getArticleList();
  },
  methods: {
    async handleCurrentChange(page) {
      this.current = page;
      this.getArticleList();
    },
    async getArticleList() {
      const res = await getArticleList({
        current: this.current,
        pageSize: this.pageSize,
      });
      this.list = res.data.rows;
      this.total = res.data.total;
    },

    async showDrawer(type, id) {
      this.isShowDrawer = true;
      this.type = type;
      if (type === "preview") {
        this.aaa = false;
      }
      if (type !== "add") {
        const res = await getArticleDetail(id);
        this.form = res.data;
      }
    },

    drawerClose() {
      if (this.type !== "preview") {
        this.$refs.formRef.resetFields();
      }

      this.from = {
        stem: "",
        content: "",
      };
    },
    submit() {
      this.$refs.formRef.validate(async (valid) => {
        if (!valid) return;
        if (this.type === "add") {
          await addArticle(this.form);
        } else {
          await editArticle({
            id: this.form.id,
            stem: this.form.stem,
            content: this.form.content,
          });
        }
        const msg = this.type === "add" ? "添加成功" : "修改成功";
        this.$message.success(msg);

        this.current = 1;
        this.getArticleList();
        this.isShowDrawer = false;
      });
    },
    async deleteArtile(id) {
      await removeArticle(id);
      this.$message.success("删除成功");
      this.current = 1;
      this.getArticleList();
    },
  },
};
</script>

<style lang="scss" scoped>
.el-card {
  margin-top: 25px;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 16px;
  }
  .actions {
    font-size: 18px;
    display: flex;
    justify-content: space-around;
    color: #666;
    > i:hover {
      color: rgba(114, 124, 245, 1);
      cursor: pointer;
    }
  }
}
.el-pagination {
  margin-top: 20px;
  text-align: center;
}
.el-breadcrumb {
  margin-top: 10px;
}
.el-form {
  padding-right: 40px;
}
.quill-editor {
  ::v-deep .ql-editor {
    height: 300px;
  }
}
.el-rate {
  padding: 10px 0;
}
.article-preview {
  padding: 0 40px 40px 40px;
  > h5 {
    font-size: 20px;
    color: #666;
    border-bottom: 1px dashed #ccc;
    padding-bottom: 30px;
    margin: 0 0 20px 0;
  }
}
</style>