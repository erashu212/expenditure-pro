module ExpenseManager.Service{
	export class LocalStorage{

		private $$window: ng.IWindowService;
		public isLocalStorage: boolean;

		constructor(){
			this.$$window = window;
			this.isLocalStorage = typeof this.$$window.localStorage  != 'undefined';
		}

		public set(key:string, value: any[]): boolean{
			this.$$window.localStorage.setItem(key, JSON.stringify(value));
			return true;
		}

		public get(key:string){
			let data = this.$$window.localStorage.getItem(key);
			if(!data){
				return false;
			}
			return JSON.parse(data);
		}

		public remove(key:string):boolean{
			this.$$window.localStorage.removeItem(key);
			return true;
		}
	}
}