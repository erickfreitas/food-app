import { NavController } from 'ionic-angular';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'tab',
  templateUrl: 'tab.html'
})
export class TabComponent implements OnInit {  

  @Input('pagina') pagina: string
  tabs: Array<{ icon: string, path: string, label:string, isSelected: boolean}>

  constructor(private navController: NavController) {    
    
  }

  ngOnInit(): void {
    this.tabs = []
    this.tabs.push({ icon: 'pricetags', path: 'CategoriesPage', label: 'Categorias', isSelected: this.pagina == 'Categorias' })
    this.tabs.push({ icon: 'menu', path: 'MyOrdersPage', label: 'Meus Pedidos', isSelected: this.pagina == 'Meus Pedidos' })
    this.tabs.push({ icon: 'contact', path: 'MyAccountPage', label: 'Minha Conta', isSelected: this.pagina == 'Minha Conta' })
    console.log(this.pagina)
  }

  selectTab(path: string):void{
    this.navController.setRoot(path)
  }
} 
