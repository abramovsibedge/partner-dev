import * as React from 'react';

interface Props {
	type: string
}

export class Flags extends React.Component<Props, {}> {
	render() {
		const {
			type
		} = this.props;

		switch (type) {
			case 'de':
        return <img src={require('../../static/icons/svg/germany.svg')} alt={type} />;
      case 'jm':
        return <img src={require('../../static/icons/svg/jamaica.svg')} alt={type} />;
      case 'hk':
        return <img src={require('../../static/icons/svg/hong-kong.svg')} alt={type} />;
      case 'ru':
        return <img src={require('../../static/icons/svg/russia.svg')} alt={type} />;
      case 'jp':
        return <img src={require('../../static/icons/svg/japan.svg')} alt={type} />;
      case 'dk':
        return <img src={require('../../static/icons/svg/denmark.svg')} alt={type} />;
      case 'ua':
        return <img src={require('../../static/icons/svg/ukraine.svg')} alt={type} />;
      case 'fr':
        return <img src={require('../../static/icons/svg/france.svg')} alt={type} />;
      case 'sc':
        return <img src={require('../../static/icons/svg/seychelles.svg')} alt={type} />;
      case 'br':
        return <img src={require('../../static/icons/svg/brazil.svg')} alt={type} />;
      case 'se':
        return <img src={require('../../static/icons/svg/sweden.svg')} alt={type} />;
      case 'sg':
        return <img src={require('../../static/icons/svg/singapore.svg')} alt={type} />;
      case 'gb':
        return <img src={require('../../static/icons/svg/united-kingdom.svg')} alt={type} />;
      case 'ie':
        return <img src={require('../../static/icons/svg/ireland.svg')} alt={type} />;
      case 'us':
        return <img src={require('../../static/icons/svg/united-states-of-america.svg')} alt={type} />;
      case 'us-south':
        return <img src={require('../../static/icons/svg/united-states-of-america.svg')} alt={type} />;
      case 'ca':
        return <img src={require('../../static/icons/svg/canada.svg')} alt={type} />;
      case 'in':
        return <img src={require('../../static/icons/svg/india.svg')} alt={type} />;
      case 'za':
        return <img src={require('../../static/icons/svg/south-africa.svg')} alt={type} />;
      case 'it':
        return <img src={require('../../static/icons/svg/italy.svg')} alt={type} />;
      case 'mx':
        return <img src={require('../../static/icons/svg/mexico.svg')} alt={type} />;
      case 'es':
        return <img src={require('../../static/icons/svg/spain.svg')} alt={type} />;
      case 'au':
        return <img src={require('../../static/icons/svg/australia.svg')} alt={type} />;
      case 'cz':
        return <img src={require('../../static/icons/svg/czech-republic.svg')} alt={type} />;
      case 'tr':
        return <img src={require('../../static/icons/svg/turkey.svg')} alt={type} />;
      case 'nl':
        return <img src={require('../../static/icons/svg/netherlands.svg')} alt={type} />;

			default:
        return <img src={require('../../static/icons/svg/germany.svg')} alt={type} />;
    }
	}
};