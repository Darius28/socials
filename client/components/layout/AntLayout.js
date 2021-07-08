import { Layout, Menu } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { useContext, useState } from "react";
import AuthNav from "../nav/AuthNav";
import { AuthContext } from "../../context/auth-context";
const { Header, Content, Footer, Sider } = Layout;
const { Item, SubMenu } = Menu;

export default function AntLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const { state } = useContext(AuthContext);
  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        {state && state.user && (
          <Sider
            style={{ minHeight: "100vh" }}
            collapsible
            collapsed={collapsed}
            onCollapse={() => {
              setCollapsed(!collapsed);
            }}
          >
            <div className="logo text-center" style={{color: "white"}}>SOCIALS</div>
            <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
              <Item key="1" icon={<LoginOutlined />}>
                Option 1
              </Item>
              <Item key="2" icon={<DesktopOutlined />}>
                Option 2
              </Item>
              <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                <Item key="3">Tom</Item>
                <Item key="4">Bill</Item>
                <Item key="5">Alex</Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                <Item key="6">Team 1</Item>
                <Item key="8">Team 2</Item>
              </SubMenu>
              <Item key="9" icon={<FileOutlined />}>
                Files
              </Item>
            </Menu>
          </Sider>
        )}

        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            <AuthNav />
          </Header>
          <Content style={{ margin: "0 16px" }}>
            <div
              className="site-layout-background"
              style={{ minHeight: "75vh", margin: "16px 0" }}
            >
              {children}
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Socials ©2021 Created by Socials Inc.
          </Footer>
        </Layout>
      </Layout>
    </>
  );
}
