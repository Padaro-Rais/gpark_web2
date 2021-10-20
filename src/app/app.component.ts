import { Component } from "@angular/core";
import { TranslationService } from "./lib/core/translator/translator.service";
import { ActivatedRoute, Router } from "@angular/router";
import * as moment from "moment";
import { Location } from "@angular/common";
import "moment/locale/fr";
import "moment/locale/en-gb";
import * as lodash from "lodash";
import { AppUIStateProvider } from "./lib/core/ui-state";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "ADMINISTRATION";

  showComponentLoadingDirective = false;
  showGeolocationErrorModal = false;
  uiState$ = this.uiState.uiState;

  constructor(
    private translate: TranslationService,
    private router: Router,
    private location: Location,
    private uiState: AppUIStateProvider,
    private route: ActivatedRoute
  ) {
    this.translate.provider.addLangs(["en", "fr"]);
    // const browserLang = this.translate.provider.getBrowserLang()
    const browserLang = "fr";
    this.translate.provider.setDefaultLang(browserLang);
    // Insure that translation provider use the user browser language
    this.translate.provider.use(
      browserLang.match(/en|fr/) ? browserLang : "en"
    );
    // Set moment locale
    moment.locale(browserLang);
  }

  onIsAuthenticated(value: boolean) {
    setTimeout(() => {
      const currentPath = this.location.path();
      if (value && lodash.isEmpty(currentPath)) {
        this.router.navigateByUrl(
          this.route?.snapshot.data.navigateTo || "/dashboard"
        );
        return;
      }
    }, 0);
    this.showComponentLoadingDirective = false;
  }

  onEndActionEvent({ status, message }: { status: number; message: string }) {
    this.uiState.endAction(message, status);
  }
}
