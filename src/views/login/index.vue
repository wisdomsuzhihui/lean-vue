<template>
    <div class="login-container">
        <h3 class="title">系统登录</h3>
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