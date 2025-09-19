import PopulationTrendApp from "@/components/PopulationTrendApp";
import { render, screen } from "@testing-library/react";

describe('Home Render', () => {
  test('<HomePresentation /> の message にテキストを渡せる', async () => {
    render(<PopulationTrendApp />)
    expect(await screen.findByText("北海道")).toBeInTheDocument();
    expect(await screen.findByText("青森県")).toBeInTheDocument();
  });
});