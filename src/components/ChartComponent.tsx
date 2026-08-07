"use client";
import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

interface Dataset {
  label: string;
  data: number[];
  backgroundColor?: string | string[];
}

interface ChartComponentProps {
  chartType: "bar" | "line" | "pie";
  labels: string[];
  datasets: Dataset[];
  title?: string;
}

export default function ChartComponent({ chartType, labels, datasets, title }: ChartComponentProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const chartDatasets = datasets.map((ds) => ({
      label: ds.label,
      data: ds.data,
      backgroundColor: ds.backgroundColor || "#6366f1",
      borderColor: chartType === "line"
        ? (typeof ds.backgroundColor === "string" ? ds.backgroundColor.replace("0.2", "1") : "#6366f1")
        : undefined,
      borderWidth: chartType === "line" ? 2 : 0,
      tension: 0.4,
      fill: chartType === "line",
      pointBackgroundColor: chartType === "line" ? "#6366f1" : undefined,
      pointBorderColor: chartType === "line" ? "#fff" : undefined,
      pointBorderWidth: chartType === "line" ? 2 : undefined,
      pointRadius: chartType === "line" ? 4 : undefined,
      borderRadius: chartType === "bar" ? 6 : undefined,
    }));

    chartRef.current = new Chart(ctx, {
      type: chartType,
      data: {
        labels,
        datasets: chartDatasets,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: datasets.length > 1 || chartType === "pie",
            labels: {
              color: "#94a3b8",
              font: { size: 12 },
              padding: 16,
            },
          },
          title: {
            display: false,
          },
          tooltip: {
            backgroundColor: "rgba(15,23,42,0.9)",
            titleColor: "#e2e8f0",
            bodyColor: "#e2e8f0",
            borderColor: "rgba(99,102,241,0.3)",
            borderWidth: 1,
            cornerRadius: 8,
            padding: 12,
          },
        },
        scales: chartType === "pie" ? {} : {
          x: {
            grid: { color: "rgba(148,163,184,0.08)" },
            ticks: { color: "#94a3b8", font: { size: 11 } },
          },
          y: {
            grid: { color: "rgba(148,163,184,0.08)" },
            ticks: { color: "#94a3b8", font: { size: 11 } },
            beginAtZero: true,
          },
        },
        animation: {
          duration: 800,
          easing: "easeOutQuart",
        },
      },
    });

    return () => {
      chartRef.current?.destroy();
    };
  }, [chartType, labels, datasets, title]);

  return (
    <div style={{ height: "280px", position: "relative" }}>
      <canvas ref={canvasRef} />
    </div>
  );
}
