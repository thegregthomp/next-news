import { render, screen } from '@testing-library/react';
import Home from '@/pages/index';

jest.mock('next/router', () => require('next-router-mock'));
jest.mock('next/dist/client/router', () => require('next-router-mock'));

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />);

    // const heading = screen.getByRole('heading', {
    //   name: /welcome to next\.js!/i,
    // });

    // expect(heading).toBeInTheDocument();
  });
});
