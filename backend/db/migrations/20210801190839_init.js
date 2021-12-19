const {
    listTable,
    schemesTable,
    fundPortfolioTable,
    mfTypeTable,
    mfSubTypeTable
} = require('../../configs/constants');

exports.up = function (knex, Promise) {
    return createListTable()
        .then(createMfTypeTable)
        .then(createMfSubTypeTable)
        .then(createSchemes)
        .then(createFundPortfolio);

    function createListTable() {
        return knex.schema.createTable(listTable, function (table) {
            table.increments('id');
            table.jsonb('list_data');
            table.timestamps(true, true);
        });
    }

    function createMfTypeTable() {
        return knex.schema.createTable(mfTypeTable, function (table) {
            table.increments('id');
            table.text('fund_type');
            table.timestamps(true, true);
        });
    }

    function createMfSubTypeTable() {
        return knex.schema.createTable(mfSubTypeTable, function (table) {
            table.increments('id');
            table.text('fund_subtype');
            table.timestamps(true, true);
            table.bigInteger('fund_type_id').notNullable().references('id').inTable(mfTypeTable);
        });
    }

    function createSchemes() {
        return knex.schema.createTable(schemesTable, function (table) {
            table.increments('id');
            table.text('code').unique();
            table.text('name');
            table.text('short_name');
            table.text('lump_available');
            table.text('sip_available');
            table.float('lump_min');
            table.float('lump_min_additional')
            table.float('lump_max')
            table.float('lump_multiplier')
            table.float('sip_min')
            table.float('sip_max')
            table.float('sip_multiplier')
            table.specificType('sip_dates', 'text ARRAY');
            table.text('redemption_allowed');
            table.float('redemption_amount_multiple')
            table.float('redemption_amount_minimum')
            table.float('redemption_quantity_multiple')
            table.float('redemption_quantity_minimum')
            table.text('category');
            table.float('lock_in_period')
            table.specificType('upsizecode_sip_dates', 'text ARRAY');
            table.float('sip_maximum_gap')
            table.timestamps(true, true);
            table.text('fund_house');
            table.text('fund_name');
            table.text('short_code');
            table.text('detail_info');
            table.text('ISIN');
            table.text('direct');
            table.text('switch_allowed');
            table.text('stp_flag');
            table.text('swp_flag');
            table.jsonb('sips');
            table.text('instant');
            table.text('reinvestment');
            table.specificType('tags', 'text ARRAY');
            table.text('slug');
            table.text('channel_partner_code');
            table.float('tax_period')
            table.jsonb('nav');
            table.jsonb('last_nav');
            table.float('jan_31_nav')
            table.float('volatility')
            table.jsonb('returns');
            table.text('start_date');
            table.text('face_value');
            table.text('plan');
            table.text('expense_ratio');
            table.text('expense_ratio_date');
            table.text('fund_manager');
            table.text('crisil_rating');
            table.text('investment_objective');
            table.text('portfolio_turnover');
            table.text('maturity_type');
            table.float('aum');
            table.bigInteger('fund_type_id').notNullable().references('id').inTable(mfTypeTable);
            table.bigInteger('fund_subtype_id').notNullable().references('id').inTable(mfSubTypeTable);
        });
    }

    function createFundPortfolio() {
        return knex.schema.createTable(fundPortfolioTable, function (table) {
            table.increments('id');
            table.bigInteger('fund_base_scheme_id');
            table.text('fund_isin');
            table.text('portfolio_date');
            table.text('sector_code');
            table.text('sector_name');
            table.text('company_name');
            table.text('security_name')
            table.text('security_asset_class')
            table.float('percentage_to_aum')
            table.float('value_in_mn')
            table.text('credit_rating')
            table.text('holding_isin')
            table.text('currency_id');
            table.text('country_id')
            table.text('ticker')
            table.bigInteger('scheme_id').notNullable().references('id').inTable(schemesTable);
        });
    }
};

exports.down = function (knex) {
    return droplisttable().then(dropfundsportfoliotable).then(dropschemestable).then(dropmfsubtypestable).then(dropmftypestable);

    function droplisttable() {
        return knex.schema.dropTableIfExists(listTable);
    }

    function dropschemestable() {
        return knex.schema.dropTableIfExists(schemesTable);
    }

    function dropfundsportfoliotable() {
        return knex.schema.dropTableIfExists(fundPortfolioTable);
    }

    function dropmftypestable() {
        return knex.schema.dropTableIfExists(mfTypeTable);
    }

    function dropmfsubtypestable() {
        return knex.schema.dropTableIfExists(mfSubTypeTable);
    }
};