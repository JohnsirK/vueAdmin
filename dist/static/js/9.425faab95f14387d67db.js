webpackJsonp([9],{ePHb:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("Xxa5"),s=a.n(n),o=a("Aaao"),i=a("mOxS"),r=a("P9l9"),l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e};function c(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,a){return function n(s,o){try{var i=t[s](o),r=i.value}catch(e){return void a(e)}if(!i.done)return Promise.resolve(r).then(function(e){n("next",e)},function(e){n("throw",e)});e(r)}("next")})}}var u={data:function(){return{imgUrl:"//elm.cangdu.org/img/",foodData:[],nowData:[],initNum:1,foodNum:0,pageNum:0,limit:50,offset:0,loading:!0,id:void 0,num:1,cateRes:null,expands:[],editFoodShow:!1,editNow:{},selectIndex:null,selectMenu:"",addSpec:!1,specData:{specs_name:"",packing_fee:0,price:10},rules:{specs_name:[{required:!0,message:"请输入规格名称",trigger:"blur"}]},menu:[],successImageUrl:"",isEdit:!1}},components:{indexHeader:o.a,indexFooter:i.default},methods:{editFood:function(e,t){this.editFoodShow=!0,this.editNow=e,this.changeData(e),this.getMenuData(),console.log(this.editNow)},removeFood:function(e,t){var a=this;return c(s.a.mark(function n(){var o;return s.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,Object(r.p)(e.item_id);case 2:o=n.sent,console.log(e,t),0===o.status?a.$message.error("对不起，您的权限不足！"):(a.$message.success("删除成功！"),a.foodData.splice(t,1));case 5:case"end":return n.stop()}},n,a)}))()},initData:function(){var e=this;return c(s.a.mark(function t(){var a;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(r.r)();case 2:1===(a=t.sent).status?e.foodNum=a.count:console.log("获取数据失败"),e.getFoods();case 5:case"end":return t.stop()}},t,e)}))()},getFoods:function(){var e=this;return c(s.a.mark(function t(){var a;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e.loading=!0,e.offset=e.limit*e.pageNum,t.next=4,Object(r.t)(e.limit,e.offset,e.$route.query.id);case 4:(a=t.sent)&&(e.loading=!1,e.foodData=[],a.forEach(function(t,a){var n={};n.name=t.name,n.item_id=t.item_id,n.description=t.description,n.rating=t.rating,n.month_sales=t.month_sales,n.restaurant_id=t.restaurant_id,n.category_id=t.category_id,n.image_path=t.image_path,n.specfoods=t.specfoods,n.index=a,e.foodData.push(n)}));case 6:case"end":return t.stop()}},t,e)}))()},expand:function(e,t){if(t.length?(this.expands=[],e&&this.expands.push(e.index)):this.expands=[],t)this.changeData(e);else{var a=this.expands.indexOf(e.index);this.expands.splice(a,1)}},changeData:function(e,t){var a=this;return c(s.a.mark(function t(){var n,o;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(r.z)(e.restaurant_id);case 2:return n=t.sent,t.next=5,Object(r.s)(e.category_id);case 5:o=t.sent,Promise.all([n,o]).then(function(t){a.nowData=l({},e,{restaurant_name:t[0].name,restaurant_address:t[0].address,category_name:t[1].name}),a.selectMenu={label:o.name,value:e.category_id},a.foodData.splice(e.index,1,l({},a.nowData))}).catch(function(e){console.log(e)});case 7:case"end":return t.stop()}},t,a)}))()},changeSize:function(e){this.limit=e},changeCurrent:function(e){this.pageNum=e-1},uploadBefore:function(e){var t="image/jpeg"===e.type||"image/png"===e.type,a=e.size/1024/1024<2;return t||this.$message.error("上传菜品图片只能是JPG或者PNG格式"),a||this.$message.error("上传菜品图片大小不能超过2MB"),t&&a},upImgSuccess:function(e,t){1===e.status?this.editNow.image_path=e.image_path:this.$message.error("上传图片失败")},delRow:function(e,t){this.editNow.specfoods.splice(e,1)},addSpecClick:function(e,t){var a=this;console.log(t),this.$refs[e].validate(function(e){if(!e)return!1;a.editNow.specfoods.push(l({},a.specData)),a.specData.specs_name="",a.specData.packing_fee=0,a.specData.price=10,a.addSpec=!1})},getMenuData:function(){var e=this;return c(s.a.mark(function t(){var a;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e.menu=[],console.log(e.editNow.restaurant_id),t.next=4,Object(r.u)(e.editNow.restaurant_id);case 4:a=t.sent,console.log(a),a.forEach(function(t,a){e.menu.push({label:t.name,value:t.id,index:a})});case 7:case"end":return t.stop()}},t,e)}))()},editSelect:function(e){this.selectIndex=e,this.selectMenu=this.menu[e]},editFoodBtn:function(){var e=this;return c(s.a.mark(function t(){var a,n;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e.isEdit=!0,a=e.editNow.specfoods,n=[],a.map(function(e){n.push({specs:e.specs_name,packing_fee:e.packing_fee,price:e.price})}),t.next=6,Object(r.C)(e.editNow.item_id,e.editNow.name,e.editNow.image_path,e.editNow.restaurant_id,e.editNow.category_id,n);case 6:t.sent&&(e.isEdit=!1,e.$message.success("修改成功！")),e.editFoodShow=!1;case 9:case"end":return t.stop()}},t,e)}))()}},mounted:function(){this.initData()},watch:{limit:function(){this.getFoods()},pageNum:function(){this.getFoods()}}},d={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"homeRight"},[a("index-header"),e._v(" "),a("el-main",[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],ref:"tableList",staticStyle:{width:"100%"},attrs:{data:e.foodData,"row-key":function(e){return e.index},"expand-row-keys":e.expands},on:{"expand-change":e.expand}},[a("el-table-column",{attrs:{type:"expand"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-form",{staticClass:"demo-table-expand",attrs:{"label-position":"left",inline:""}},[a("el-form-item",{attrs:{label:"食品名称"}},[a("span",[e._v("\n                  "+e._s(t.row.name)+"\n                ")])]),e._v(" "),a("el-form-item",{attrs:{label:"餐馆名称"}},[a("span",[e._v("\n                  "+e._s(t.row.restaurant_name)+"\n                ")])]),e._v(" "),a("el-form-item",{attrs:{label:"食品ID"}},[a("span",[e._v("\n                  "+e._s(t.row.item_id)+"\n                ")])]),e._v(" "),a("el-form-item",{attrs:{label:"餐馆ID"}},[a("span",[e._v("\n                  "+e._s(t.row.restaurant_id)+"\n                ")])]),e._v(" "),a("el-form-item",{attrs:{label:"食品介绍"}},[a("span",[e._v("\n                  "+e._s(t.row.description)+"\n                ")])]),e._v(" "),a("el-form-item",{attrs:{label:"餐馆地址"}},[a("span",[e._v("\n                  "+e._s(t.row.restaurant_address)+"\n                ")])]),e._v(" "),a("el-form-item",{attrs:{label:"食品评分"}},[a("span",[e._v("\n                  "+e._s(t.row.rating)+"\n                ")])]),e._v(" "),a("el-form-item",{attrs:{label:"食品分类"}},[a("span",[e._v("\n                  "+e._s(t.row.category_name)+"\n                ")])]),e._v(" "),a("el-form-item",{attrs:{label:"月销量"}},[a("span",[e._v("\n                  "+e._s(t.row.month_sales)+"\n                ")])])],1)]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"食品名称",prop:"name"}}),e._v(" "),a("el-table-column",{attrs:{label:"食品介绍",prop:"description"}}),e._v(" "),a("el-table-column",{attrs:{label:"评分",prop:"rating"}}),e._v(" "),a("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"warning",size:"mini"},on:{click:function(a){return e.editFood(t.row,t.$index)}}},[e._v("\n              编辑\n            ")]),e._v(" "),a("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(a){return e.removeFood(t.row,t.$index)}}},[e._v("\n              删除\n            ")])]}}])})],1),e._v(" "),a("div",{staticClass:"m10"},[a("el-pagination",{attrs:{"current-page":e.initNum,"page-sizes":[50,100,200],"page-size":50,layout:"total, sizes, prev, pager, next, jumper",total:e.foodNum},on:{"size-change":e.changeSize,"current-change":e.changeCurrent}})],1)],1),e._v(" "),a("index-footer"),e._v(" "),a("el-dialog",{attrs:{title:"修改食品信息",visible:e.editFoodShow,width:"40%"},on:{"update:visible":function(t){e.editFoodShow=t}}},[a("el-form",{attrs:{model:e.editNow,"label-width":"100px"}},[a("el-form-item",{attrs:{label:"食品名称"}},[a("el-input",{attrs:{"auto-complete":"off"},model:{value:e.editNow.name,callback:function(t){e.$set(e.editNow,"name",t)},expression:"editNow.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"食品介绍"}},[a("el-input",{attrs:{"auto-complete":"off"},model:{value:e.editNow.description,callback:function(t){e.$set(e.editNow,"description",t)},expression:"editNow.description"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"食品分类"}},[a("el-select",{attrs:{placeholder:e.selectMenu.label},on:{change:e.editSelect},model:{value:e.selectIndex,callback:function(t){e.selectIndex=t},expression:"selectIndex"}},e._l(e.menu,function(e,t){return a("el-option",{key:t,attrs:{label:e.label,value:e.index}})}),1)],1),e._v(" "),a("el-form-item",{attrs:{label:"食品图片"}},[a("el-upload",{staticClass:"avatar-uploader",attrs:{action:"//elm.cangdu.org/v1/addimg/food","show-file-list":!1,"on-success":e.upImgSuccess,"before-upload":e.uploadBefore}},[e.editNow.image_path?a("img",{staticClass:"avatar",attrs:{src:e.imgUrl+e.editNow.image_path}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1)],1),e._v(" "),a("el-table",{staticClass:"editTable",staticStyle:{width:"100%"},attrs:{size:"mini",stripe:"",border:"",data:e.editNow.specfoods,"header-cell-style":{background:"#eef1f6",color:"#606266",textAlign:"center"},"cell-style":{textAlign:"center"}}},[a("el-table-column",{attrs:{prop:"specs_name",label:"规格"}}),e._v(" "),a("el-table-column",{attrs:{prop:"packing_fee",label:"包装费"}}),e._v(" "),a("el-table-column",{attrs:{prop:"price",label:"价格"}}),e._v(" "),a("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(a){return e.delRow(t.$index,t.row)}}},[e._v("删除")])]}}])})],1),e._v(" "),a("p",{staticClass:"m10 tc"},[a("el-button",{attrs:{type:"warning"},on:{click:function(t){e.addSpec=!0}}},[e._v("\n          添加规格\n        ")])],1),e._v(" "),a("el-dialog",{attrs:{title:"添加规格",visible:e.addSpec,width:"400px","append-to-body":""},on:{"update:visible":function(t){e.addSpec=t}}},[a("el-form",{ref:"specForm",attrs:{model:e.specData,"label-width":"100px",size:"small",rules:e.rules}},[a("el-form-item",{attrs:{label:"规格名称",prop:"specs_name"}},[a("el-input",{attrs:{"auto-complete":"off"},model:{value:e.specData.specs_name,callback:function(t){e.$set(e.specData,"specs_name",t)},expression:"specData.specs_name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"配送费"}},[a("el-input-number",{attrs:{size:"small",min:0},model:{value:e.specData.packing_fee,callback:function(t){e.$set(e.specData,"packing_fee",t)},expression:"specData.packing_fee"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"价格"}},[a("el-input-number",{attrs:{size:"small",min:10},model:{value:e.specData.price,callback:function(t){e.$set(e.specData,"price",t)},expression:"specData.price"}})],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.addSpecClick("specForm",e.specData)}}},[e._v("添加")]),e._v(" "),a("el-button",{on:{click:function(t){e.addSpec=!1}}},[e._v("取消")])],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary",loading:e.isEdit},on:{click:e.editFoodBtn}},[e._v("\n           "+e._s(e.isEdit?"修改中":"确认修改")+"\n        ")]),e._v(" "),a("el-button",{on:{click:function(t){e.editFoodShow=!1}}},[e._v("\n          取消\n        ")])],1)],1)],1)},staticRenderFns:[]};var p=a("VU/8")(u,d,!1,function(e){a("i6Pl")},null,null);t.default=p.exports},i6Pl:function(e,t){}});