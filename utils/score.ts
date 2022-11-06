export const getAverageScore = (totalScore: number, scoreAmount: number): number => {
    return parseFloat((totalScore / scoreAmount).toFixed(2))
}
