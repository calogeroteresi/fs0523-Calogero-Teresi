import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './components/header/navbar/navbar.component';
import { UsersComponent } from './components/header/users/users.component';
import { LogoComponent } from './components/header/logo/logo.component';
import { HeaderWrapperComponent } from './components/header/header-wrapper/header-wrapper.component';
import { HttpClientModule } from '@angular/common/http';
import { FormSearchComponent } from './components/comp.pages/form-search/form-search.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './Pages/home/home.component';
import { SidebarComponent } from './components/comp.pages/sidebar/sidebar.component';
import { DetailsCardComponent } from './components/comp.pages/details-card/details-card.component';
import { SmallForecastCardComponent } from './components/comp.pages/small-forecast-card/small-forecast-card.component';



@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        UsersComponent,
        LogoComponent,
        HeaderWrapperComponent,
        FormSearchComponent,
        HomeComponent,
        SidebarComponent,
        DetailsCardComponent,
        SmallForecastCardComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class AppModule { }
