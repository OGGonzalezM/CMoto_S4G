# -*- coding: utf-8 -*-

{
    'name': 'POS Customization',
    'version': '1.0',
    'category': 'POS',
    'description': """
POS Customization
====================================
Show pricelist discount on
- POS Product List
- POS Tickets
- Convert amount in words
    """,
    'author': 'VPerfect CS',
    'website': 'http://www.vperfectcs.com',
    'depends': ['point_of_sale'],
    'data': [
        'views/templates.xml',
    ],
    'qweb': [
        'static/src/xml/pos_redesign.xml'
    ],
}
