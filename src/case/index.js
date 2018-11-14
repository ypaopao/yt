import React, { Component } from 'react';
import { Table, Divider, Tag , Input,Tooltip } from 'antd';
import 'antd/dist/antd.min.css'
import './index.css'
import {getData} from '../api/index.js'
const columns = [{
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    render: text => <a href="javascript:;">{text}</a>,
}, {
    title: '描述',
    dataIndex: 'description',
    key: 'description',
    width:'300px',
    className:'description',
    render:text => <Tooltip title={text}><p>{text}</p></Tooltip>
}, {
    title: '图片',
    dataIndex: 'image',
    key: 'image',
    render:text =><img src={text}></img>
}, {
    title: '地址',
    dataIndex: 'baseURL',
    key: 'baseURL',
    render:text =><a href={text}>{text}</a>
},{
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: tags => (
        <span>
      {tags.map(tag => <Tag color="blue" key={tag}>{tag}</Tag>)}
    </span>
    ),
},{
    title:'属性',
    key:'properties',
    dataIndex:'properties',
    render: texts => (
            <span>
                {texts.map(text => <Tag color="blue" key={text.type}><a href={text.url}>{text.type}</a></Tag>)}
            </span>
        )
}];



class Case extends Component{
    constructor(){
        super();
        this.state={
            data:[],
            showData:[]
        }
    }
    componentDidMount(){
        getData()
            .then((res)=>{
                console.log(res);
                this.setState({
                    data:res.apis,
                    showData:res.apis,
                })
            })
    }
    childrenFn=(Item,value)=>{
        if (Item.indexOf(value)>=0) {
            return true
        }else {
            return false
        }
    }
    handleData=(e)=>{
        let value=e.target.value;

        this.setState({
            showData:this.state.data.filter((Item) => {
                if (value === '') return true;
                return this.childrenFn(Item.tags, value)
            })
        })
    };
    render(){
        return(
            <div>
                <div className={'search'}>
                    <Input placeholder="删选数据" onKeyUp={this.handleData}/>
                </div>
                <div>
                    <Table columns={columns} dataSource={this.state.showData} />
                </div>
            </div>
        )
    }
}
export default Case
