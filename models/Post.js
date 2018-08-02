var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */

var Post = new keystone.List('Post', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});

Post.add({
	contactName: { type: String },
	contactMail: { type: String },

	title: { type: String, required: true },

	jobTitle: { type: String },
	jobType: {
		type: Types.Select,
		options: 'Täysipäiväinen, 0-15h/vko, 15-30h/vko',
	},
	jobDuration: {
		type: Types.Select,
		options: 'Vakituinen, Kesätyö, Määräaikainen, Muu',
	},
	studyYear: {
		type: Types.Select,
		options: 'Ei merkitystä, 1, 2, 3, 4, 5+',
	},
	jobStartDate: { type: Types.Date, index: true },
	deadline: { type: Types.Date, index: true },
	location: {
		type: String,
	},
	link: { type: String },

	state: {
		type: Types.Select,
		options: 'draft, published, archived',
		default: 'draft',
		index: true,
	},
	author: { type: Types.Relationship, ref: 'User', index: true },
	publishedDate: {
		type: Types.Date,
		index: true,
		dependsOn: { state: 'published' },
	},
	image: { type: Types.CloudinaryImage },
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 },
	},
	categories: { type: Types.Relationship, ref: 'PostCategory', many: true },
});

Post.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

Post.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Post.register();
