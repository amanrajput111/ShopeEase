// src/pages/AdminDashboard.jsx

import React from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";

import {
  Dashboard,
  ShoppingBag,
  ShoppingCart,
  People,
  Category,
  Payments,
  Settings,
  Logout,
  Inventory,
  Add,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const drawerWidth = 250;

const stats = [
  {
    title: "Total Products",
    value: 250,
    icon: <Inventory fontSize="large" />,
    color: "#1976d2",
  },
  {
    title: "Total Orders",
    value: 1245,
    icon: <ShoppingCart fontSize="large" />,
    color: "#2e7d32",
  },
  {
    title: "Users",
    value: 845,
    icon: <People fontSize="large" />,
    color: "#ed6c02",
  },
  {
    title: "Revenue",
    value: "₹8,45,000",
    icon: <Payments fontSize="large" />,
    color: "#9c27b0",
  },
];

const orders = [
  {
    id: "#ORD1001",
    customer: "Rahul Sharma",
    total: "₹89,999",
    status: "Delivered",
  },
  {
    id: "#ORD1002",
    customer: "Priya Singh",
    total: "₹4,999",
    status: "Processing",
  },
  {
    id: "#ORD1003",
    customer: "Amit Kumar",
    total: "₹29,999",
    status: "Shipped",
  },
  {
    id: "#ORD1004",
    customer: "Sneha Patel",
    total: "₹2,999",
    status: "Delivered",
  },
];

export function AdminDashboard() {
  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            backgroundColor: "#0f172a",
            color: "#fff",
          },
        }}
      >
        <Typography
          variant="h5"
          sx={{
            p: 3,
            fontWeight: "bold",
            color: "#60a5fa",
          }}
        >
          MyShop Admin
        </Typography>

        <Divider sx={{ bgcolor: "#334155" }} />

        <List>
          <ListItemButton>
            <ListItemIcon sx={{ color: "white" }}>
              <Dashboard />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon sx={{ color: "white" }}>
              <Inventory />
            </ListItemIcon>
            <ListItemText primary="Products" />
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon sx={{ color: "white" }}>
              <ShoppingBag />
            </ListItemIcon>
            <ListItemText primary="Orders" />
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon sx={{ color: "white" }}>
              <People />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon sx={{ color: "white" }}>
              <Category />
            </ListItemIcon>
            <ListItemText primary="Categories" />
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon sx={{ color: "white" }}>
              <Settings />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon sx={{ color: "white" }}>
              <Logout />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </List>
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{
            backgroundColor: "white",
            color: "black",
            boxShadow: 1,
          }}
        >
          <Toolbar className="flex justify-between">
            <Typography variant="h6">
              Dashboard
            </Typography>

            <div className="flex items-center gap-3">
              <Typography>Admin</Typography>
              <Avatar>A</Avatar>
            </div>
          </Toolbar>
        </AppBar>

        <Container maxWidth="xl" className="py-8">
          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

            {stats.map((item) => (
              <Card
                key={item.title}
                className="rounded-xl shadow-md hover:shadow-xl transition"
              >
                <CardContent className="flex justify-between items-center">
                  <div>
                    <Typography color="text.secondary">
                      {item.title}
                    </Typography>

                    <Typography
                      variant="h4"
                      fontWeight="bold"
                    >
                      {item.value}
                    </Typography>
                  </div>

                  <Avatar
                    sx={{
                      bgcolor: item.color,
                      width: 60,
                      height: 60,
                    }}
                  >
                    {item.icon}
                  </Avatar>
                </CardContent>
              </Card>
            ))}

          </div>

          {/* Quick Actions */}
          <Paper className="p-6 mt-8 rounded-xl">
            <Typography
              variant="h6"
              fontWeight="bold"
              gutterBottom
            >
              Quick Actions
            </Typography>

            <div className="flex flex-wrap gap-3 mt-4">
              <Link to="/product-upload">
              <Button
                variant="contained"
                startIcon={<Add />}
              >
                Add Product
              </Button>
              </Link>

              <Button variant="outlined">
                Manage Orders
              </Button>

              <Button variant="outlined">
                Manage Users
              </Button>

              <Button variant="outlined">
                Categories
              </Button>
            </div>
          </Paper>

          {/* Recent Orders */}
          <Paper className="p-6 mt-8 rounded-xl">
            <Typography
              variant="h6"
              fontWeight="bold"
              gutterBottom
            >
              Recent Orders
            </Typography>

            <Divider sx={{ mb: 3 }} />

            {orders.map((order) => (
              <div
                key={order.id}
                className="flex justify-between items-center py-4 border-b last:border-b-0"
              >
                <div>
                  <Typography fontWeight="bold">
                    {order.id}
                  </Typography>

                  <Typography color="text.secondary">
                    {order.customer}
                  </Typography>
                </div>

                <Typography>{order.total}</Typography>

                <Typography
                  color={
                    order.status === "Delivered"
                      ? "green"
                      : order.status === "Processing"
                      ? "orange"
                      : "blue"
                  }
                >
                  {order.status}
                </Typography>
              </div>
            ))}
          </Paper>
        </Container>
      </Box>
    </Box>
  );
}