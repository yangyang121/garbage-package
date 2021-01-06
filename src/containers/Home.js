import React from "react"
import Link from "../package/react-router/react-router-dom/Link"
// import { Link } from "react-router-dom"
import { bindActionCreators } from "../package/redux"
import { connect } from "../package/react-redux"
import { addAction, resetAction } from "../index"
import XLSX from "xlsx"
// import _ from "lodash"

function handleExport() {
  const dataSource = [
    {
      name: "yy",
      type: 1,
      sex: 1,
      desc: "第一条",
      station: "前端",
    },
    {
      name: "后台yy",
      type: 2,
      sex: 2,
      desc: "第二条",
      station: "后台",
    },
  ]
  const arr = []
  arr[0] = ["编号", "姓名", "婚姻状况", "性别", "描述", "职位"]
  const sort = ["name", "type", "sex", "desc", "station"]
  const sexMap = {
    1: "男",
    2: "女",
  }
  const typeMap = {
    1: "未婚",
    2: "已婚",
  }
  dataSource.forEach((item, index) => {
    if (!Array.isArray(arr[index + 1])) {
      arr[index + 1] = [index + 1]
    }
    sort.forEach((key) => {
      if (key === "sex") {
        arr[index + 1].push(sexMap[item[key]])
      } else if (key === "type") {
        arr[index + 1].push(typeMap[item[key]])
      } else {
        arr[index + 1].push(item[key])
      }
    })
  })
  console.log(arr)
  const filename = "file.xlsx" //文件名称
  const ws_name = "Sheet1" //Excel第一个sheet的名称
  const wb = XLSX.utils.book_new()
  const ws = XLSX.utils.aoa_to_sheet(arr)
  XLSX.utils.book_append_sheet(wb, ws, ws_name) //将数据添加到工作薄
  XLSX.writeFile(wb, filename) //导出Excel
}

const Home = React.forwardRef((props, ref) => {
  console.log(props)
  return (
    <div className="home">
      <p>首页</p>
      <p>
        <Link to="/backend">后台</Link>
      </p>
      <p>
        <Link to="/admin">管理员</Link>
      </p>
      <p>
        <Link to="/login">登录</Link>
      </p>
      <p ref={ref} onClick={() => console.log("title clicked")}>
        {props.title}
      </p>
      <p>{props.count}</p>
      <button onClick={props.actions.addAction}>add</button>
      <button onClick={props.actions.resetAction}>reset</button>
      <button onClick={handleExport}>export</button>
    </div>
  )
})

const mapStateToProps = (state) => ({
  count: state.count,
})

const mapDispatchToProps = (dispatch) => ({
  addAction: () => dispatch(addAction()),
  actions: bindActionCreators({ addAction, resetAction }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
