import React from 'react'
import './admSidebar.scss'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import StoreIcon from '@mui/icons-material/Store';
import CreditCardIcon from "@mui/icons-material/CreditCard";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const AdmSidebar = () => {
    return (
        <div className="adm-sidebar">
            <div className="top">
                <span className="logo">
                    MnNLC Admin
                </span>
            </div>
            <hr />
            <div className="center">
                <ul>
                    <p className="title">main</p>
                    <li>
                        <DashboardIcon className="icon" />
                        <span>
                            Dashboard
                        </span>
                    </li>
                    <p className="title">lists</p>
                    <li>
                        <PersonOutlineIcon className="icon" />
                        <span>
                            Users
                        </span>
                    </li>
                    <li>
                        <StoreIcon className="icon" />
                        <span>
                            Products
                        </span>
                    </li>
                    <li>
                        <CreditCardIcon className="icon" />
                        <span>
                            Orders
                        </span>
                    </li>
                    <li>
                        <LocalShippingIcon className="icon" />
                        <span>
                            Delivery
                        </span>
                    </li>
                    <p className="title">useful</p>
                    <li>
                        <InsertChartIcon className="icon" />
                        <span>
                            Stats
                        </span>
                    </li>
                    <li>
                        <NotificationsNoneIcon className="icon" />
                        <span>
                            Nofitications
                        </span>
                    </li>
                    <p className="title">service</p>
                    <li>
                        <SettingsSystemDaydreamOutlinedIcon className="icon" />
                        <span>
                            System Health
                        </span>
                    </li>
                    <li>
                        <PsychologyOutlinedIcon className="icon" />
                        <span>
                            Logs
                        </span>
                    </li>
                    <li>
                        <SettingsApplicationsIcon className="icon" />
                        <span>
                            Settings
                        </span>
                    </li>
                    <p className="title">user</p>
                    <li>
                        <AccountCircleOutlinedIcon className="icon" />
                        <span>
                            Profile
                        </span>
                    </li>
                    <li>
                        <ExitToAppIcon className="icon" />
                        <span>
                            Logout
                        </span>
                    </li>
                </ul>
            </div>
            <div className="bottom">
                <div className="color-option">
                    
                </div>
                <div className="color-option">

                </div>
            </div>
        </div>
    )
}

export default AdmSidebar