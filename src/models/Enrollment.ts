export interface Enrollment {
    id?: number;
    studentId: number;
    courseId: number;
    enrollmentDate: Date;
    amount: number;
    paymentDate: Date;
    status: boolean;
}