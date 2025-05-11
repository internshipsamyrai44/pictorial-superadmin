// Pagination information model
export type PaginationModel = {
    /** total number of pages available */
    pagesCount: number;
    /** current page number */
    page: number;
    /** number of items per page */
    pageSize: number;
    /** total number of items */
    totalCount: number;
};

// Represents a follow relationship
export type Follow = {
    id: number;
    userId: number;
    /** optional username of the followed user */
    userName?: string;
    /** ISO date-time string, e.g. 2019-12-03T09:54:33Z */
    createdAt: string;
};

// Image asset information
export type Avatar = {
    url?: string;
    width?: number;
    height?: number;
    fileSize?: number;
};

// Basic info about the owner of a post
export type PostOwnerModel = {
    id: number;
    userName: string;
    firstName?: string;
    lastName?: string;
    avatars?: Avatar[];
};

// Public profile details
export type Profile = {
    id: number;
    userName?: string;
    firstName?: string;
    lastName?: string;
    city?: string;
    country?: string;
    region?: string;
    /** ISO date-time string */
    dateOfBirth?: string;
    aboutMe?: string;
    /** ISO date-time string */
    createdAt: string;
    avatars?: Avatar[];
};

// Ban information for a user
export type UserBan = {
    /** reason for ban */
    reason: string;
    /** ISO date-time string */
    createdAt: string;
};

// Core user type
export type User = {
    id: number;
    userName: string;
    email: string;
    /** ISO date-time string */
    createdAt: string;
    profile: Profile;
    userBan?: UserBan;
};

// Paginated list of users
export type UsersPaginationModel = {
    users: User[];
    pagination: PaginationModel;
};

// Paginated list of follows
export type FollowPaginationModel = {
    pagination: PaginationModel;
    items: Follow[];
};

// Result of admin login
export type LoginAdmin = {
    logged: boolean;
};

// Payment record
export type Payment = {
    id?: number;
    userId?: number;
    paymentMethod?: PaymentMethod;
    amount?: number;
    currency?: CurrencyType;
    /** ISO date-time string */
    createdAt?: string;
    /** ISO date-time string */
    endDate?: string;
    type?: SubscriptionType;
};

export enum PaymentMethod {
    STRIPE = "STRIPE",
    PAYPAL = "PAYPAL",
    CREDIT_CARD = "CREDIT_CARD",
}

export enum CurrencyType {
    USD = "USD",
    EUR = "EUR",
}

export enum SubscriptionType {
    MONTHLY = "MONTHLY",
    DAY = "DAY",
    WEEKLY = "WEEKLY",
}

// Subscription payment details with user info
export type SubscriptionPaymentsModel = {
    id?: number;
    userId?: number;
    paymentMethod: PaymentMethod;
    amount?: number;
    currency?: CurrencyType;
    /** ISO date-time string */
    createdAt?: string;
    /** ISO date-time string */
    endDate?: string;
    type: SubscriptionType;
    userName: string;
    avatars?: Avatar[];
};

// Paginated list of subscription payments
export type PaymentsPaginationModel = {
    pagination: PaginationModel;
    items: SubscriptionPaymentsModel[];
};

// Subscription grouping by payment
export type SubscriptionByPaymentModel = {
    id: string;
    businessAccountId: number;
    status: StatusSubscriptionType;
    /** ISO date-time string */
    dateOfPayment?: string;
    /** ISO date-time string */
    startDate?: string;
    /** ISO date-time string */
    endDate?: string;
    type: SubscriptionType;
    price: number;
    paymentType?: PaymentMethod;
    payments: Payment[];
};

export enum StatusSubscriptionType {
    PENDING = "PENDING",
    ACTIVE = "ACTIVE",
    FINISHED = "FINISHED",
    DELETED = "DELETED",
}

// Paginated list of subscription groups
export type PaymentPaginationModel = {
    pagination: PaginationModel;
    items: SubscriptionByPaymentModel[];
};

// Image attached to a post
export type ImagePost = {
    id?: number;
    /** ISO date-time string */
    createdAt?: string;
    url?: string;
    width?: number;
    height?: number;
    fileSize?: number;
};

// Post details
export type Post = {
    images: ImagePost[];
    id: number;
    ownerId: number;
    description: string;
    /** ISO date-time string */
    createdAt: string;
    /** ISO date-time string */
    updatedAt: string;
    postOwner: PostOwnerModel;
    userBan?: UserBan;
};

// Paginated list of posts
export type PostsPaginationModel = {
    pagination: PaginationModel;
    items: Post[];
};

// Paginated list of images by user
export type PostsByUserModel = {
    pagination: PaginationModel;
    items?: ImagePost[];
};

export enum SortDirection {
    ASC = "asc",
    DESC = "desc",
}

export enum UserBlockStatus {
    ALL = "ALL",
    BLOCKED = "BLOCKED",
    UNBLOCKED = "UNBLOCKED",
}
