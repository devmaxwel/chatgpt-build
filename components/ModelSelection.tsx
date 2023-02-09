"use client";
import React from "react";
import useSWR from "swr";
import Select from "react-select";

const fetchModels = () => fetch("/api/getEngines").then((res) => res.json());

const ModelSelection = () => {
  const { data: models, isLoading } = useSWR("/models", fetchModels);
  const { data: model, mutate: setModel } = useSWR("/model", {
    fallbackData: "text-davinci-003",
  });
  return (
    <div>
      <Select
        className="mt-2"
        options={models?.modelOptions}
        defaultValue={model}
        isSearchable
        menuPosition="fixed"
        isLoading={isLoading}
        placeholder={model}
        classNames={{
          control: (state) => "bg-[#fff] border-[#434654]",
        }}
        onChange={(e) => setModel(e.value)}
      />
    </div>
  );
};

export default ModelSelection;
