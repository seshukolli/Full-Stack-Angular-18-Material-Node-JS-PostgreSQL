import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Account } from '../account';
import { AccountService } from '../account.service';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatTableModule, MatSortModule, MatPaginatorModule, CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {
  
  displayedColumns: string[] = ['id', 'name', 'type', 'balance', 'edit', 'delete'];
  dataSource = new MatTableDataSource<Account>();
  balance: any = undefined;
  account: Account = {
    id: 0,
    name: '',
    type: '',
    balance: this.balance
  };
  accounts: Account[] = [];
  filteredAccounts: Account[] = [];

  constructor(private accountService: AccountService) {}

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator: any;

  ngAfterViewInit(): void {
    console.log("ngAfterViewInit called");
    
    this.accountService.fetchAllAccounts().subscribe(
      (data) => {
        console.log("Fetched data:", data);
        this.accounts = data;
        this.dataSource = new MatTableDataSource<Account>(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.error("Error fetching data:", error);
      }
    );
  }

  searchAccount(input: any) {
    this.filteredAccounts = this.accounts.filter(item =>
      item.name.toLowerCase().includes(input.toLowerCase())
      || item.type.toLowerCase().includes(input.toLowerCase())
      || item.balance.toString().includes(input)
    );
    this.dataSource = new MatTableDataSource<Account>(this.filteredAccounts);
  }

  addOrEditAccount(account: Account) {
    if (account.id !== 0) {
      this.accountService.updateAccount(account).subscribe({
        next: (data) => {
          console.log(`Account Updated successfully!`);
          window.location.reload();
        },
        error: (err) => {
          console.log(err);
          window.location.reload();
        }
      });
    } else {
      this.accountService.createAccount(account).subscribe({
        next: (data) => {
          console.log(`New Account created successfully!`);
          window.location.reload();
        },
        error: (err) => {
          console.log(err);
          window.location.reload();
        }
      });
    }
  }

  populateAccountFormFields(account: Account) {
    this.account.id = account.id;
    this.account.name = account.name;
    this.account.type = account.type;
    this.account.balance = account.balance;
  }

  deleteAccount(id: Number) {
    const isConfirmed = window.confirm("Are you sure you want to Delete?");
    if (isConfirmed) {
      this.accountService.deleteAccount(id).subscribe((data) => {
        this.accounts = this.accounts.filter(item => item.id !== id);
        window.location.reload();
      });
    }
  }

  resetForm() {
    this.account = {
      id: 0,
      name: '',
      type: '',
      balance: this.balance
    };
  }
}
