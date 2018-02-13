# -*- coding: utf-8 -*-
{
    'name': "Descuento Marca",

    'summary': """Add Discount per Brands""",

    'description': """
    """,

    'author': "Soluciones 4G",
    'website': "soluciones4g.com",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/master/odoo/addons/base/module/module_dat$
    # for the full list
    'category': 'Sale Wizard',
    'version': '0.1',

    # any module necessary for this one to work correctly
    'depends': ['base'],

    # always loaded
    'data': [
        'view/wiz_desc_view.xml',
        #'templates.xml',
    ],
    # only loaded in demonstration mode
    'demo': [
        #'demo/openacademy_course_demo.xml',
    ],
    'installable': True,
    'auto_install': False,
}


