export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  DELIVERING = 'DELIVERING',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
  DELETED = 'DELETED'
}

export enum TransactionStatus {
  DRAFT = 'DRAFT',
  CAPTURED = 'CAPTURED',
  ERROR = 'ERROR',
  CANCELED = 'CANCELED',
  DELETED = 'DELETED'
}

export enum OrderStatusColor {
  DEFAULT = 'default',
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  SUCCESS = 'success',
  WARNING = 'warning',
  DANGER = 'danger'
}
