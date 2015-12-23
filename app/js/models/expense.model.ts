module ExpenseManager.Models{
	export interface IExpense{
		Id : number;
		Title: string;
		Amount: number;
		Categories: Array<ICategory>; 
		CreateDate: string;
	}
}