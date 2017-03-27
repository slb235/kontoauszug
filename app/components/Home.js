
import React, { Component } from 'react';
import { GridList, GridTile } from 'material-ui/GridList';
import { Link } from 'react-router';
import fidorImage from '../images/home/fidor.png';
import paypalImage from '../images/home/paypal.png';
import stripeImage from '../images/home/stripe.png';
import settingsImage from '../images/home/settings.png';

export default class Home extends Component {
  render() {
    return (
      <GridList>
        <Link to="/fidor">
          <GridTile title="Fidor Bank">
            <img src={fidorImage} alt="Fidor Bank" />
          </GridTile>
        </Link>
        <Link to="/paypal">
          <GridTile title="PayPal">
            <img src={paypalImage} alt="PayPal" />
          </GridTile>
        </Link>
        <GridTile title="Stripe">
          <img src={stripeImage} alt="Stripe" />
        </GridTile>
        <Link to="/settings">
          <GridTile title="Einstellungen">
            <img src={settingsImage} alt="Einstellungen" />
          </GridTile>
        </Link>
      </GridList>
    );
  }
}
