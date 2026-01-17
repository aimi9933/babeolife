import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const SleepChart: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 600;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 40, left: 40 };

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Mock data representing a 60-minute sleep cycle for an infant
    // Active sleep (REM) -> Quiet Sleep (Deep) -> Active Sleep
    const data = d3.range(0, 61, 2).map(m => {
      let depth = 0; // 0 = Awake, 1 = Light, 2 = Deep
      if (m < 5) depth = 0.2; // Falling asleep
      else if (m < 20) depth = 1; // Active/Light Sleep
      else if (m < 40) depth = 2; // Deep Sleep
      else if (m < 55) depth = 1; // Transition
      else depth = 0.1; // Waking/Arousal
      return { minute: m, depth };
    });

    const xScale = d3.scaleLinear()
      .domain([0, 60])
      .range([0, innerWidth]);

    const yScale = d3.scaleLinear()
      .domain([0, 2.5])
      .range([innerHeight, 0]);

    // Area generator
    const area = d3.area<{ minute: number, depth: number }>()
      .x(d => xScale(d.minute))
      .y0(innerHeight)
      .y1(d => yScale(d.depth))
      .curve(d3.curveBasis);

    // Draw area
    g.append("path")
      .datum(data)
      .attr("fill", "#D8E2DC") // Babeo Sage
      .attr("fill-opacity", 0.6)
      .attr("stroke", "#8EA49A")
      .attr("stroke-width", 2)
      .attr("d", area);

    // X Axis
    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale).ticks(6).tickFormat(d => `${d}m`))
      .attr("color", "#9CA3AF");

    // Y Axis (Custom labels)
    const yAxis = d3.axisLeft(yScale)
      .tickValues([0, 1, 2])
      .tickFormat((d) => {
        if (d === 0) return "Awake";
        if (d === 1) return "Active";
        if (d === 2) return "Deep";
        return "";
      });

    g.append("g")
      .call(yAxis)
      .attr("color", "#9CA3AF")
      .style("font-size", "10px");

    // Title
    g.append("text")
      .attr("x", innerWidth / 2)
      .attr("y", -5)
      .attr("text-anchor", "middle")
      .style("font-family", "Nunito")
      .style("font-size", "14px")
      .style("fill", "#5C5751")
      .text("Typical 60-Minute Newborn Sleep Cycle");

  }, []);

  return (
    <div className="w-full overflow-hidden flex justify-center bg-white p-4 rounded-xl border border-babeo-beige shadow-sm">
      <svg ref={svgRef} viewBox="0 0 600 300" className="w-full max-w-lg h-auto" />
    </div>
  );
};

export default SleepChart;
