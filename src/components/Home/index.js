import React, { useCallback, useEffect, useState } from 'react'
import "./index.css"
import 'antd/dist/antd.css'; 
import {  Layout, Menu , Button, Table, Form, Input } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
 
  LogoutOutlined
} from '@ant-design/icons';
import {
  DeleteFilled ,
  EditFilled
} from '@ant-design/icons';
import { connect } from 'react-redux';

import {bindActionCreators} from 'redux'
import * as employeeAction from '../../redux/actions/index'
import confirm from 'antd/lib/modal/confirm';
import { Modal } from 'antd';
import { useAuth0 } from '@auth0/auth0-react'
import Avatar from 'antd/lib/avatar/avatar';




const { Header, Sider, Content,Footer } = Layout;

 const Home = ({litsEmployee,employeeAct}) => {
  const { logout} = useAuth0();
    const [collapsed,setCollapsed] = useState(false)
   
    let  isUser = JSON.parse(localStorage.getItem('isUser'));
  
    const logoutRedirect=()=>{
      logout();
      localStorage.clear();
    }
 

    const [form] = Form.useForm();
    const [visible,setVisible] = useState(false)
    const [showEditEmploy,setShowEditEmploy] = useState(false)
    const [showInfo,setShowInfo] = useState(false)
    const [newEmployee,setNewEmployee] = useState({})
    const toggle = () => {
        setCollapsed(!collapsed);
      };
   
        const fetchEmployee= useCallback(
            () => {
                const { getData } = employeeAct;
                getData();
            },
            [employeeAct],
        )
     
      useEffect(() => {
    
        fetchEmployee();
      }, [fetchEmployee]);
  


      const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Date of birth',
          dataIndex: 'dateofbirth',
          key: 'age',
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
        },
        {
          title: 'Phone',
          dataIndex: 'phone',
          key: 'phone',
        },{
          title: 'Action',
          dataIndex: '',
          key: 'option',
          render: (text,record) => <> <Button > <EditFilled onClick={()=>showEmployeeEdit(record)}/> </Button>
          <Button onClick={()=>onHandleDeleteEmployee(record)}> <DeleteFilled /> </Button></>,
        }
      ];
     
      const  showEmployeeEdit=(data)=>{
        setShowEditEmploy(true)
        setNewEmployee(data)
        form.setFieldsValue(data)
      }
      const onHandleEditEmployee = values=>{
          const {editData} = employeeAct;
          editData(values,newEmployee.id);
          success("Sửa thành công");
          setShowEditEmploy(false)
      }
   
     const onHandleAddEmployee=values=>{
       const {addData} = employeeAct;
       const today = new Date();
       const birthDate = new Date(values.dateofbirth);
       let age_now = today.getFullYear() - birthDate.getFullYear();
       const m = today.getMonth() - birthDate.getMonth();
       if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
       {
           age_now--;
       }
       if(age_now<10){
        success("Nhân viên phải trên 10 tuổi")
       }
       else{
        const newEmployee = {...values}
        addData(newEmployee)
        success("Thêm nhân viên thành công")
        handleCancel();
    
       }
     
     }
     
     const onHandleDeleteEmployee = (data) => {
         const {deleteData} =employeeAct;

        const {id} = data;
        confirm({
            title: 'Are you sure delete this task?',
        
            content: 'Some descriptions',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
              deleteData(id)
              success("Xóa nhân viên thành công")
            },
            onCancel() {
            },
          });
      };
    
      function success(mess) {
        Modal.success({
          content: `${mess}`,
        });
      }
   
  
   
    const  handleCancel = e => {
        setVisible(false)
      };
      const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
      };
     const handleCancelInfo =()=>{
      setShowInfo(false)
     }
  

    return (
        <Layout>
        <Header className="site-layout-background" style={{ padding: 0 }}>
            {Object.keys(collapsed)?<MenuUnfoldOutlined className="trigger" onClick={toggle}/>:
           <MenuFoldOutlined  className="trigger"  onClick={toggle}/>
            
           }
           
              <h1 className="title-header">Task3 </h1>
              <Button className="btn-profile" style={{background: 'none', border: 'none'}}  onClick={()=>setShowInfo(true)}> <Avatar src={isUser.picture} /> </Button>
            </Header>
         
          <Layout className="site-layout">
         
          <Sider trigger={null} collapsible collapsed={collapsed}>
              
              <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                <Menu.Item key="1" icon={<UserOutlined />}>
                  Quản lý người dùng
                </Menu.Item>
               
                <Menu.Item key="3" icon={<LogoutOutlined />}   onClick={() => logoutRedirect()}>
                  Log out
                </Menu.Item>
              </Menu>
            </Sider>
            <Content
              className="site-layout-background"
              style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
              }}
            >   
            <Button type="primary" danger  className="button-add" onClick={()=> setVisible(true)}>Thêm nhân viên</Button>
            <br/>
         
                <Table  dataSource={litsEmployee} columns={columns} />;
            </Content>
           
          </Layout>
          <Footer style={{ textAlign: 'center' }}>
                Employee management ©2020 Created by Thiện NĐ</Footer>
                <Modal
          title="Add Employee"
          visible={visible}
          onCancel={handleCancel}
          footer= {null}  
        >
           <Form {...layout}   name="nest-messages" onFinish={onHandleAddEmployee}>
      <Form.Item name= 'name' label="Name" rules={[{ required: true }]}   >
        <Input />
      </Form.Item>
      <Form.Item name="phone" label="phone" >
        <Input />
      </Form.Item>
      <Form.Item name="dateofbirth" label="Date of birth" >
      <Input type="date" />
      </Form.Item>
      <Form.Item name="address" label="Address">
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
        </Modal>

        <Modal
          title="Edit Employee"
          visible={showEditEmploy}
          onCancel={()=>setShowEditEmploy(false)}
          footer= {null}  
        >
           <Form  form={form} {...layout}  name="nest-messages" onFinish={onHandleEditEmployee}>
      <Form.Item name= 'name' label="Name" rules={[{ required: true }]}   >
        <Input />
      </Form.Item>
      <Form.Item name="phone" label="phone" >
        <Input />
      </Form.Item>
      <Form.Item name="dateofbirth" label="Date of birth" >
      <Input type="date" />
      </Form.Item>
      <Form.Item name="address" label="Address">
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
        </Modal>

        <Modal
          title="Profile"
          visible={showInfo}
          onCancel={handleCancelInfo}
          footer= {null}  
          className ="modal-profile"
        >
           <Avatar size={104} src={isUser.picture}/>
            <p style={{color: 'blue', fontSize: '20px', fontFamily: 'tahoma', margin: 0}}>{isUser.name}</p>
            <p>{isUser.email}</p>
        </Modal>
        
        </Layout>
    )
}

const  mapStateToProps= state =>{
    return {
        litsEmployee: state.employeeData.lists
    }
}

const mapDispatchToProps = dispatch=>{
    return{
        employeeAct: bindActionCreators(employeeAction,dispatch)
    }
    
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)

