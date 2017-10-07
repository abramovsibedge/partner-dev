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
        return <img src={require('../../static/icons/svg/germany.svg')} width="16" height="16" alt={type} />;
      case 'jm':
        return <img src={require('../../static/icons/svg/jamaica.svg')} width="16" height="16" alt={type} />;
      case 'hk':
        return <img src={require('../../static/icons/svg/hong-kong.svg')} width="16" height="16" alt={type} />;
      case 'ru':
        return <img src={require('../../static/icons/svg/russia.svg')} width="16" height="16" alt={type} />;
      case 'jp':
        return <img src={require('../../static/icons/svg/japan.svg')} width="16" height="16" alt={type} />;
      case 'dk':
        return <img src={require('../../static/icons/svg/denmark.svg')} width="16" height="16" alt={type} />;
      case 'ua':
        return <img src={require('../../static/icons/svg/ukraine.svg')} width="16" height="16" alt={type} />;
      case 'fr':
        return <img src={require('../../static/icons/svg/france.svg')} width="16" height="16" alt={type} />;
      case 'sc':
        return <img src={require('../../static/icons/svg/seychelles.svg')} width="16" height="16" alt={type} />;
      case 'br':
        return <img src={require('../../static/icons/svg/brazil.svg')} width="16" height="16" alt={type} />;
      case 'se':
        return <img src={require('../../static/icons/svg/sweden.svg')} width="16" height="16" alt={type} />;
      case 'sg':
        return <img src={require('../../static/icons/svg/singapore.svg')} width="16" height="16" alt={type} />;
      case 'gb':
        return <img src={require('../../static/icons/svg/united-kingdom.svg')} width="16" height="16" alt={type} />;
      case 'ie':
        return <img src={require('../../static/icons/svg/ireland.svg')} width="16" height="16" alt={type} />;
      case 'us':
        return <img src={require('../../static/icons/svg/united-states-of-america.svg')} width="16" height="16" alt={type} />;
      case 'us-south':
        return <img src={require('../../static/icons/svg/united-states-of-america.svg')} width="16" height="16" alt={type} />;
      case 'ca':
        return <img src={require('../../static/icons/svg/canada.svg')} width="16" height="16" alt={type} />;
      case 'in':
        return <img src={require('../../static/icons/svg/india.svg')} width="16" height="16" alt={type} />;
      case 'za':
        return <img src={require('../../static/icons/svg/south-africa.svg')} width="16" height="16" alt={type} />;
      case 'it':
        return <img src={require('../../static/icons/svg/italy.svg')} width="16" height="16" alt={type} />;
      case 'mx':
        return <img src={require('../../static/icons/svg/mexico.svg')} width="16" height="16" alt={type} />;
      case 'es':
        return <img src={require('../../static/icons/svg/spain.svg')} width="16" height="16" alt={type} />;
      case 'au':
        return <img src={require('../../static/icons/svg/australia.svg')} width="16" height="16" alt={type} />;
      case 'cz':
        return <img src={require('../../static/icons/svg/czech-republic.svg')} width="16" height="16" alt={type} />;
      case 'tr':
        return <img src={require('../../static/icons/svg/turkey.svg')} width="16" height="16" alt={type} />;
      case 'nl':
        return <img src={require('../../static/icons/svg/netherlands.svg')} width="16" height="16" alt={type} />;

			default:
        return <img src={require('../../static/icons/svg/germany.svg')} width="16" height="16" alt={type} />;
    }
	}
};