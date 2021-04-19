import Swal from 'sweetalert2';
import {SweetAlertOptions} from 'sweetalert2';
import {window} from 'rxjs/operators';

export class DialogAlert {
  static async message(params: any) {
    return new Promise(async (resolve, reject) => {
      const titles = {
        error: 'AVISO',
        warning: 'ATENÇÃO',
        info: 'INFORMAÇÃO',
        success: 'SUCESSO'
      };
      const classHeader = `header ${params.classHeader} ${params.type}`;
      const classBody = `body ${params.classBody}`;
      const classFooter = `footer ${params.type}`;

      const getMessages = () => {
        if (Array.isArray(params.message)) {
          return params.message;
        } else if (typeof params.message === 'string') {
          return [params.message];
        }
      };

      const getTextMessage = () => {
        let _return = '';
        for (const m of getMessages()) {
          _return += `<div class="text-message">${m}</div>`;
        }
        return _return;
      };
      const getTitle = () => params.title ? params.title : titles[params.type];


      document['closeDialogAlert'] = (isOk) => {
        Swal.close();
        if (isOk) {
          resolve(true);

        } else {
          resolve(false);
        }
      };
      const textOk = (params.btnTextOk || 'OK');
      const textCancelar = (params.btnTextCancelar || 'Cancelar');
      const getButtons = () => {
        if (params.confirm) {
          return `<button class="btn-ok" onclick="closeDialogAlert(true)">${textOk}</button> <button class="btn-cancel" onclick="closeDialogAlert()">${textCancelar}</button>`;
        } else {
          return `<button class="btn-ok" onclick="closeDialogAlert(true)">${textOk}</button>`;
        }
      };

      const a: SweetAlertOptions = {
        customClass: {
          content: 'dialog-alert-container'
        },
        html: `
                <div class="dialog-alert">
                            <div class="${classHeader}">
                                <div class="title">${getTitle()}</div>
                                <div class="icon-close" onclick="closeDialogAlert(false)">X</div>
                            </div>
                            <div class="${classBody}">
                               ${getTextMessage()}
                            </div>
                            <div class="${classFooter}">
                                   ${getButtons()}
                            </div>
                        </div>
                    `,
        showCancelButton: false,
        showConfirmButton: false
      };
      await Swal.fire(a);
    });
  }

  static async info(params: any = {}) {
    params.type = 'info';
    return await DialogAlert.message(params);
  }

  static error(params: any = {}) {
    params.type = 'info';
    DialogAlert.message(params);
  }

  static success(params: any = {}) {
    params.type = 'success';
    DialogAlert.message(params);
  }

  static warning(params: any = {}) {
    params.type = 'error';
    params.title = 'Atenção';
    DialogAlert.message(params);
  }

  static async confirm(params: any = {}) {
    params.confirm = true;
    params.type = 'error';
    return await DialogAlert.message(params);
  }
}
