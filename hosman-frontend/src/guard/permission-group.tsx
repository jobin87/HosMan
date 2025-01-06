import * as permission from './permissions';

interface IStaffRolePermissions {
  title: string;
  description: string;
  permissions: { label: string; value: string }[];
}

export const SELLER_ADMIN_PERMISSIONS: string[] = [
  permission.PRODUCT_VIEW,
  permission.PRODUCT_CREATE,
  permission.PRODUCT_EDIT,
  permission.PRODUCT_DELETE,
];

export const STAFF_ROLE_PERMISSIONS: IStaffRolePermissions[] = [
  {
    title: 'Product',
    description: 'Product related permissions',
    permissions: [
      { label: 'Show All Products', value: permission.PRODUCT_VIEW },
      { label: 'Create New Product', value: permission.PRODUCT_CREATE },
      { label: 'Edit Existing Product', value: permission.PRODUCT_EDIT },
      { label: 'Delete Product', value: permission.PRODUCT_DELETE },
    ],
  },
  {
    title: 'Order',
    description: 'Permissions related to Order',
    permissions: [
      { label: 'Show All Order', value: permission.ORDER_VIEW },
      { label: 'Create New Order', value: permission.ORDER_CREATE },
      { label: 'Edit Existing Order', value: permission.ORDER_EDIT },
      { label: 'Delete Order', value: permission.ORDER_DELETE },
    ],
  },
  {
    title: 'Invoice',
    description: 'Invoice handling permissions',
    permissions: [
      { label: 'Show All Invoice', value: permission.INVOICE_VIEW },
      { label: 'Create New Invoice', value: permission.INVOICE_CREATE },
      { label: 'Edit Existing Invoice', value: permission.INVOICE_EDIT },
      { label: 'Delete Invoice', value: permission.INVOICE_DELETE },
    ],
  },
];
