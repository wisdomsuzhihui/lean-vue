<template>
    <div class="login-container">
        <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left"
                 label-width="0px"
                 class="card-box login-form">
            <h3 class="title">系统登录</h3>
            <el-form-item prop="email">
                <span class="svg-container"><wscn-icon-svg icon-class="jiedianyoujian"/></span>
                <el-input name="email" type="text" v-model="loginForm.email" autoComplete="on"
                          placeholder="邮箱"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <span class="svg-container"><wscn-icon-svg icon-class="mima"/></span>
                <el-input name="password" type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password"
                          autoComplete="on" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
                    登录
                </el-button>
            </el-form-item>
            <div class='tips'>admin账号为:admin@wallstreetcn.com 密码随便填</div>
            <div class='tips'>editor账号:editor@wallstreetcn.com 密码随便填</div>
            <router-link to="/sendpwd" class="forget-pwd">
                忘记密码?(或首次登录)
            </router-link>
        </el-form>
        <el-dialog title="第三方验证" v-model="showDialog">
            邮箱登录成功,请选择第三方验证
            <socialSign></socialSign>
        </el-dialog>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { isWscnEmail } from 'utils/validate';
  // import socialSign from './socialsignin';
  export default{
    components: {},
    name: 'login',
    data() {
      const validateEmail = (rule, value, callback) => {
        if (!isWscnEmail(value)) {
          callback(new Error('请输入正确的合法邮箱'));
        } else {
          callback();
        }
      };
      const validatePass = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('密码不能小于6位'));
        } else {
          callback();
        }
      };
      return {
        loginForm: {
          email: 'admin@wallstreetcn.com',
          password: ''
        },
        loginRules: {
          email: [
            { required: true, trigger: 'blur', validator: validateEmail }
          ],
          password: [
            { required: true, trigger: 'blur', validator: validatePass }
          ]
        },
        loading: false,
        showDialog: false
      }
    },
    computed: {
      ...mapGetters([
        'auth_type'
      ])
    },
    methods: {
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true;
            this.$store.dispatch('LoginByEmail', this.loginForm).then(() => {
              this.loading = false;
              this.$router.push({ path: '/' });
              // this.showDialog = true;
            }).catch(err => {
              this.$message.error(err);
              this.loading = false;
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    },
    created() {
      // window.addEventListener('hashchange', this.afterQRScan);
    },
    destroyed() {
      // window.removeEventListener('hashchange', this.afterQRScan);
    }
  }
</script>