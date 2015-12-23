module ExpenseManager.Filter{
	export class CommonFilter{
		public static Concat(){
			return function(value): string{
				var concatenatedArr = [];
				if(value){
					for (var x in value)
						if (value.hasOwnProperty(x))
							concatenatedArr.push(value[x].Title);
				}
				return concatenatedArr.join(',');
			}
		}
	}
}