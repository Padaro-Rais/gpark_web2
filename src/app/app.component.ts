import { Component, OnInit } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Archlik'
  //
  constructor(private translate: TranslateService) {
    this.translate.addLangs(['en', 'fr'])
    // const browserLang = this.translate.provider.getBrowserLang()
    const browserLang = 'fr'
    this.translate.setDefaultLang(browserLang)
    // Insure that translation provider use the user browser language
    this.translate.use(browserLang.match(/en|fr/) ? browserLang : 'en')
  }
  //
  ngOnInit() {}
}
