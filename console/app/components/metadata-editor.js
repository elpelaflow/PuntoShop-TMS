import BaseMetadataEditorComponent from '@fleetbase/ember-ui/components/metadata-editor';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class MetadataEditorComponent extends BaseMetadataEditorComponent {
    @service intl;

    @action preview() {
        this.modalsManager.show('modals/view-raw-metadata', {
            title: this.intl?.t('common.preview-metadata') || 'Vista previa de metadatos',
            metadata: this.getOutput(),
            acceptButtonText: this.intl?.t('common.done') || 'Listo',
            hideDeclineButton: true,
        });
    }
}
