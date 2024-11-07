"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { useState } from "react";
import { TextInput } from "@repo/ui/textinput";
import { createOnRampTransaction } from "../app/lib/actions/createOnrampTransaction";

const SUPPORTED_BANKS = [
    {
        name: "Demo Bank",
        redirectUrl: "" 
    },
    {
        name: "HDFC Bank",
        redirectUrl: "https://netbanking.hdfcbank.com"
    },
    {
        name: "Axis Bank",
        redirectUrl: "https://www.axisbank.com/"
    },
    {
        name: "PNB Bank",
        redirectUrl: "https://www.pnbindia.in/"
    },
    {
        name: "Kotak Mahindra Bank",
        redirectUrl: "https://www.kotak.com/"
    }
];

export const AddMoney = () => {
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");
    const [value, setValue] = useState("");

    const handleAddMoney = async () => {
        await createOnRampTransaction(provider, parseFloat(value));
        if (provider === "Demo Bank") {
            alert("Money added successfully!");
        } else {
            window.location.href = redirectUrl || "";
        }
        setValue("");
    };

    return (
        <Card title="Add Money">
            <div className="w-full">
                <TextInput
                    label="Amount"
                    placeholder="Amount"
                    onChange={(val) => setValue(val)}
                    value={value}
                />
                <div className="py-2 text-left">Bank</div>
                <Select
                    onSelect={(value) => {
                        const bank = SUPPORTED_BANKS.find(x => x.name === value);
                        setRedirectUrl(bank?.redirectUrl || "");
                        setProvider(bank?.name || "");
                    }}
                    options={SUPPORTED_BANKS.map(x => ({
                        key: x.name,
                        value: x.name
                    }))}
                />
                <div className="flex justify-center pt-6">
                    <Button onClick={handleAddMoney}>
                        Add Money
                    </Button>
                </div>
            </div>
        </Card>
    );
};