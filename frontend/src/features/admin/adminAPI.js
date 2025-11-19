import api from "../../api/axios";

// DASHBOARD STATS
export const fetchAdminStatsRequest = () => api.get("/admin/stats");

// USERS
export const fetchAdminUsersRequest = () => api.get("/admin/users");
export const updateUserRoleRequest = (id, role) =>
    api.patch(`/admin/users/${id}/role`, { role });
export const toggleUserStatusRequest = (id, isActive) =>
    api.patch(`/admin/users/${id}/status`, { isActive });

// VENDORS
export const fetchAdminVendorsRequest = () => api.get("/admin/vendors");
export const updateVendorApprovalRequest = (id, isApproved) =>
    api.patch(`/admin/vendors/${id}/approval`, { isApproved });

// DELIVERY PARTNERS
export const fetchAdminDeliveryPartnersRequest = () =>
    api.get("/admin/delivery-partners");

// ORDERS
export const fetchAdminOrdersRequest = () => api.get("/admin/orders");
export const assignDeliveryPartnerRequest = (orderId, deliveryPartnerId) =>
    api.patch(`/admin/orders/${orderId}/assign-delivery`, {
        deliveryPartnerId,
    });
export const updateAdminOrderStatusRequest = (orderId, status) =>
    api.patch(`/admin/orders/${orderId}/status`, { status });
