webpackJsonp([16],{FApx:function(t,e){},qcMO:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("Xxa5"),r=a.n(n),i=a("Aaao"),o=a("mOxS"),l=a("P9l9");function s(t){return function(){var e=t.apply(this,arguments);return new Promise(function(t,a){return function n(r,i){try{var o=e[r](i),l=o.value}catch(t){return void a(t)}if(!o.done)return Promise.resolve(l).then(function(t){n("next",t)},function(t){n("throw",t)});t(l)}("next")})}}var c={data:function(){return{tableData:[],paginationIndex:1,pageNum:0,offset:0,limit:50,loading:!0,total:0}},components:{indexHeader:i.a,indexFooter:o.default},methods:{changeSize:function(t){console.log("每页"+t+"条"),this.limit=t},changeCurrent:function(t){console.log("当前页:"+t),this.pageNum=t-1,console.log(this.pageNum)},getUserData:function(){var t=this;return s(r.a.mark(function e(){var a;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(l.i)();case 2:a=e.sent,console.log(a),a.status&&(t.total=a.count);case 5:case"end":return e.stop()}},e,t)}))()},getData:function(){var t=this;return s(r.a.mark(function e(){var a;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.loading=!0,t.offset=t.pageNum*t.limit,e.next=4,Object(l.h)(t.limit,t.offset);case 4:(a=e.sent).status?(t.loading=!1,t.tableData=a.data):(t.loading=!1,console.log(a));case 6:case"end":return e.stop()}},e,t)}))()},filterTag:function(t,e){return e.admin===t}},created:function(){this.getUserData()},mounted:function(){this.getData()},watch:{pageNum:function(t){console.log("新值"+t),this.getData()},limit:function(t){this.getData()}}},u={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"homeRight"},[a("index-header"),t._v(" "),a("el-main",[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:t.tableData,"default-sort":{prop:"date",order:"descending"},stripe:"",border:""}},[a("el-table-column",{attrs:{lable:"#",type:"index",width:"100"}}),t._v(" "),a("el-table-column",{attrs:{prop:"create_time",label:"注册日期",sortable:"",width:"180"}}),t._v(" "),a("el-table-column",{attrs:{prop:"user_name",label:"用户姓名",width:"180"}}),t._v(" "),a("el-table-column",{attrs:{prop:"city",label:"注册地址"}}),t._v(" "),a("el-table-column",{attrs:{prop:"admin",label:"角色权限",width:"180",filters:[{text:"管理员",value:"管理员"},{text:"超级管理员",value:"超级管理员"}],"filter-method":t.filterTag,"filter-placement":"bottom-end"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-tag",{attrs:{type:"管理员"===e.row.admin?"primary":"success","close-transition":""}},[t._v(" "+t._s(e.row.admin))])]}}])})],1),t._v(" "),a("div",{staticClass:"paginationDiv"},[a("el-pagination",{attrs:{"current-page":t.paginationIndex,"page-sizes":[50,100,200],"page-size":50,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.changeSize,"current-change":t.changeCurrent}})],1)],1),t._v(" "),a("index-footer")],1)},staticRenderFns:[]};var d=a("VU/8")(c,u,!1,function(t){a("FApx")},null,null);e.default=d.exports}});