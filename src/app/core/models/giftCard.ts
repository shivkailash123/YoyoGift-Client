export interface GiftCard {
    id: number;
    couponCode: string;
    amount: number;
    dateOfExpiry: string;
    redeemedOn: string;
    message: string;
    senderEmail: string;
    walletBalance: number;
    redeemed: boolean;
}