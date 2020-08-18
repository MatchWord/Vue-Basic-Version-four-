<template>
  <div class="container full-width form-new-design">
    <div class="form-edit__container">
      <leftCom :formListDataLeft.sync="formListData" @leftBackClick='leftBackData' />
      <centerCom :formListDataCenter.sync="formListData" :selectIndex="selectIndex" @centerBackClick="centerBackData"  />
      <!-- // 右侧配置文件及换肤 -->
      <div class="form-setting__container">
        <el-tabs v-model="activeName" :stretch="true" @tab-click="handleClick">
          <el-tab-pane label="编辑字段" name="first">
            <div class="setting-tabs">
              <editInput :activeCenterData='activeCenterData' @rightBackClick="rightBackData"
              v-if="activeCenterData.type === 'input'" />
              <editTextarea :activeCenterData='activeCenterData' @rightBackClick="rightBackData"
              v-if="activeCenterData.type === 'textarea'" />
              <editRadio :activeCenterData='activeCenterData' @rightBackClick="rightBackData"
              v-if="activeCenterData.type === 'radio'" />
              <editCheckbox :activeCenterData='activeCenterData' @rightBackClick="rightBackData"
              v-if="activeCenterData.type === 'checkbox'" />
              <editTimePicker :activeCenterData='activeCenterData' type="TimePicker" @rightBackClick="rightBackData"
              v-if="activeCenterData.type === 'TimePicker'" />
              <editDatePicker :activeCenterData='activeCenterData' type="DatePicker" @rightBackClick="rightBackData"
              v-if="activeCenterData.type === 'DatePicker'" />
              <editTimeDatePicker :activeCenterData='activeCenterData' type="DateTimePicker" @rightBackClick="rightBackData"
              v-if="activeCenterData.type === 'DateTimePicker'" />
              <editEditUtils :activeCenterData='activeCenterData' @rightBackClick="rightBackData"
              v-if="activeCenterData.type === 'edit'" />
              <div class="no-data" v-if="!activeCenterData.type">
                <i class="tip el-icon-edit-outline"></i>
                <div class="tip">没有选定的字段</div>
                <div class="tip">请添加或者选择一个字段</div>
              </div>
            </div>
						<!-- <div class="setting-footer">
							<el-button class="btnSave" size="small" type="primary">保存报名</el-button>
						</div> -->
          </el-tab-pane>
          <el-tab-pane label="背景图片" name="second">
            <ul class="ul-pig">
              <li class="li-pig" v-for="(item, index) in imgData" :key="index" @click="clickIndex(index)">
								<img :src="item.url" alt="找不到图片" srcset="">
								<i class="icon el-icon-success" v-show="index === selectIndex"></i>
							</li>
            </ul>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script>
// import { mapGetters } from 'vuex'
import rightData from './js/right'
import leftCom from './left/leftCom'
import centerCom from './center/centerCom'
import editInput from './right/editInput'
import editTextarea from './right/editTextarea'
import editRadio from './right/editRadio'
import editCheckbox from './right/editCheckbox'
import editTimePicker from './right/editTimePicker'
import editEditUtils from './right/editEditUtils'
export default {
  name: 'Demo4',
  data () {
    return {
      formListData: [],
      activeCenterData: {},
      rightData: [],
      defaultArrParams: [],
      defaultStrParams: {},
			activeName: 'first',
			imgData:[
				{ url:require('./img/0.jpg'), id:1 },
				{ url:require('./img/1.jpg'), id:2 },
				{ url:require('./img/2.jpg'), id:3 },
				{ url:require('./img/3.jpg'), id:4 },
				{ url:require('./img/4.jpg'), id:5 },
				{ url:require('./img/5.jpg'), id:6 },
				{ url:require('./img/6.jpg'), id:7 },
				{ url:require('./img/7.jpg'), id:8 },
				{ url:require('./img/8.jpg'), id:9 },
				{ url:require('./img/9.jpg'), id:10 },
				{ url:require('./img/10.jpg'), id:11 },
				{ url:require('./img/11.jpg'), id:12 },
				{ url:require('./img/12.jpg'), id:13 },
				{ url:require('./img/13.jpg'), id:14 },
				{ url:require('./img/14.jpg'), id:15 },
				{ url:require('./img/15.jpg'), id:16 },
				{ url:require('./img/16.jpg'), id:17 },
				{ url:require('./img/17.jpg'), id:18 },
				{ url:require('./img/18.jpg'), id:19 }
			],
			selectIndex: 12
    }
  },
  mounted () {
    this.rightData = rightData
  },
  methods: {
    // left back data
    leftBackData (formListData, activeCenterData) {
      this.formListData = formListData
      this.activeCenterData = activeCenterData
    },
    // center back data
    centerBackData (newFormListData, activeCenterData) {
      this.formListData = newFormListData
      this.activeCenterData = activeCenterData
    },
    // right back data
    rightBackData (obj) {
      this.formListData = this.formListData.map(item => {
        if (obj.itemId === item.itemId) {
          return Object.assign({}, item, obj)
        } else {
          return item
        }
      })
    },
    handleClick(tab, event) {
      // console.log(tab, event);
		},
		clickIndex (index) {
      this.selectIndex = index
		}
  },
  components: {
    leftCom,
    centerCom,
    editInput,
    editTextarea,
    editRadio,
    editCheckbox,
    editTimePicker: editTimePicker,
    editDatePicker: editTimePicker,
    editTimeDatePicker: editTimePicker,
    editEditUtils
  }
}
</script>
<style lang="scss" scoped>
.container.full-width {
  max-width: none;
  padding: 0;
}
.form-edit__container {
  height: 93vh;
  display: flex;
  overflow: hidden;
}
// right
.form-setting__container {
  max-width: 290px;
  width: 100%;
  height: 100%;
  background-color: #fafafa;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 10;
  right: 0px;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.2);
  // overflow-y: auto;
  .setting-tabs {
    flex: 1 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    .no-data {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 40vh;
      .tip {
        font-size: 20px;
      }
      .el-icon-edit-outline {
        font-size: 30px;
      }
    }
  }
  .setting-footer {
    width: 100%;
    display: flex;
    padding: 14px;
    border: 1px solid #ebebeb;
    background-color: #fff;
    .btnSave {
      display: block;
      width: 80%;
      margin: auto;
    }
  }
  .ul-pig {
    margin: 0px;
    padding: 0px;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		width: 100%;
		height: 90vh;
		overflow-y: auto;
		.li-pig {
			flex: none;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: space-around;
			align-items: center;
			margin: 5px;
			width: 120px;
			height: 120px;
			float: left;
			position: relative;
      cursor: pointer;
      transition: all 1s ease;
      
			img {
				width: 100%;
				height: 100%;
			}
			.icon {
				position: absolute;
				right: 10px;
				top: 10px;
				z-index: 3;
				font-size: 30px;
				color: rgb(228, 63, 119);
			}
		}
    // .li-pig:hover {
    //   transform: scale(0.8) rotate(360deg);
    //   border-radius: 50%;
    //   overflow: hidden;
    // }
  }
}
</style>
