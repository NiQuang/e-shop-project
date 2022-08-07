import {
    HomeOutlined,
    UserOutlined,
    SkinOutlined,
    RollbackOutlined,
    ProfileOutlined,
    OrderedListOutlined
} from '@ant-design/icons';

const admSidebar = [
    {
        view: 'Dashboard',
        router: '/admin',
        icon: <HomeOutlined />
    },
    {
        view: 'Orders',
        router: '/admin/orders',
        icon: <OrderedListOutlined />
    },
    {
        view: 'User',
        router: '/admin/users',
        icon: <UserOutlined />
    },
    {
        view: 'Categories',
        router: '/admin/categories',
        icon: <ProfileOutlined />
    },
    {
        view: 'Products',
        router: '/admin/products',
        icon: <SkinOutlined />
    },
    {
        view: 'Back to website',
        router: '/',
        icon:<RollbackOutlined />
    }
]

export default admSidebar
