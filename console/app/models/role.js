import Model, { attr, hasMany } from '@ember-data/model';
import { computed } from '@ember/object';
import { format, formatDistanceToNow } from 'date-fns';
import { getOwner } from '@ember/application';

export default class RoleModel extends Model {
    /** @ids */
    @attr('string') company_uuid;

    /** @relationships */
    @hasMany('policy') policies;
    @hasMany('permission') permissions;

    /** @attributes */
    @attr('string') name;
    @attr('string') guard_name;
    @attr('string') description;
    @attr('string') service;
    @attr('string') type;
    @attr('boolean') is_mutable;
    @attr('boolean') is_deletable;

    /** @dates */
    @attr('date') created_at;
    @attr('date') updated_at;

    /** @methods */
    toJSON() {
        return this.serialize();
    }

    /** @computed */
    get displayName() {
        if (!this.name) {
            return '';
        }
        try {
            const intl = getOwner(this)?.lookup('service:intl');
            if (intl) {
                const key = `iam.roles.defaults.${this.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.name`;
                if (intl.exists(key)) {
                    return intl.t(key);
                }
            }
        } catch (e) {
            // fallback
        }
        return this.name;
    }

    get displayDescription() {
        if (!this.description && !this.name) {
            return '';
        }
        try {
            const intl = getOwner(this)?.lookup('service:intl');
            if (intl && this.name) {
                const key = `iam.roles.defaults.${this.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.description`;
                if (intl.exists(key)) {
                    return intl.t(key);
                }
            }
        } catch (e) {
            // fallback
        }
        return this.description || '';
    }

    @computed('permissions') get permissionsArray() {
        return this.permissions.toArray();
    }

    @computed('updated_at') get updatedAgo() {
        return formatDistanceToNow(this.updated_at);
    }

    @computed('updated_at') get updatedAt() {
        return format(this.updated_at, 'yyyy-MM-dd HH:mm');
    }

    @computed('updated_at') get updatedAtShort() {
        return format(this.updated_at, 'PP');
    }

    @computed('created_at') get createdAgo() {
        return formatDistanceToNow(this.created_at);
    }

    @computed('created_at') get createdAt() {
        return format(this.created_at, 'yyyy-MM-dd HH:mm');
    }

    @computed('created_at') get createdAtShort() {
        return format(this.created_at, 'PP');
    }
}
