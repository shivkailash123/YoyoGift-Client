export interface AdminStatisticsDTO {
    productCategories: string[];
    productCountByCategory: number[];
    usersJoiningDate: string[];
    usersJoiningDateCount: number[];
    topSellingProducts: string[];
    topSellingProductsCount: number[];
    purchaseTimes: string[];
    purchaseTimesCount: number[];
}