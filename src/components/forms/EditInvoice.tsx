'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { CalendarIcon } from 'lucide-react';
import { useActionState, useEffect, useState } from 'react';
import { SubmitButton } from '@/components/Buttons';
import { InvoiceUpdationAction } from '@/lib/actions';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { InvoiceSchema } from '@/lib/zod';
import { formatCurrency } from '@/utils/formatCurrency';
import Form from 'next/form';
import { cities } from '@/constants/cities';
import { states } from '@/constants/states';
import { Prisma } from '@prisma/client';
import { CurrencySign } from '@/types/types';

interface InvoiceUpdationProps {
  data: Prisma.InvoiceGetPayload<{}>;
}

export function InvoiceUpdationForm({ data }: InvoiceUpdationProps) {
  const [lastResult, action] = useActionState(InvoiceUpdationAction, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: InvoiceSchema,
      });
    },

    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });
  const [selectedDate, setSelectedDate] = useState(data.date);
  const [rate, setRate] = useState(data.invoiceItemRate.toString());
  const [quantity, setQuantity] = useState(data.invoiceItemQuantity.toString());
  const [currency, setCurrency] = useState(data.currency);
  const [selectedState, setSelectedState] = useState(data.fromState);
  const [filteredCities, setFilteredCities] = useState<
    { city: string; state: string }[]
  >([]);
  const [selectedCity, setSelectedCity] = useState(data.fromCity || '');

  const calcualteTotal = (Number(quantity) || 0) * (Number(rate) || 0);

  // Update filtered cities when the selected state changes
  useEffect(() => {
    if (selectedState) {
      setFilteredCities(cities.filter((c) => c.state === selectedState));
      setSelectedCity(''); // Reset city when state changes
    } else {
      setFilteredCities([]);
    }
  }, [selectedState]);

  // Handle state change
  const handleStateChange = (value: string) => {
    setSelectedState(value);
  };

  // Handle city change
  const handleCityChange = (value: string) => {
    setSelectedCity(value);
  };

  return (
    <Card>
      <CardContent className="p-6">
        <Form id={form.id} action={action} onSubmit={form.onSubmit} noValidate>
          <div className="flex flex-col gap-5">
            <input
              type="hidden"
              name={fields.date.name}
              value={selectedDate.toISOString()}
            />

            <input
              type="hidden"
              name={fields.total.name}
              value={calcualteTotal}
            />

            <div className="grid gap-4 md:grid-cols-3">
              <div className="flex flex-col gap-2 md:mt-6">
                <div className="flex gap-2">
                  <Badge
                    variant="outline"
                    className="rounded-sm border-dashed bg-muted-foreground/20 py-2"
                  >
                    Draft
                  </Badge>
                  <Input
                    type="text"
                    name={fields.invoiceName.name}
                    key={fields.invoiceName.key}
                    defaultValue={data.invoiceName?.toString()}
                    placeholder="Event Invoice"
                  />
                </div>
                <p className="text-sm text-red-500">
                  {fields.invoiceName.errors}
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <Label>Invoice No.</Label>
                <div className="flex">
                  <span className="flex items-center rounded-l-md border border-r-0 bg-muted px-3">
                    #
                  </span>
                  <Input
                    type="number"
                    name={fields.invoiceNumber.name}
                    key={fields.invoiceNumber.key}
                    defaultValue={data.invoiceNumber}
                    className="rounded-l-none"
                    placeholder="007"
                  />
                </div>
                <p className="text-sm text-red-500">
                  {fields.invoiceNumber.errors}
                </p>
              </div>

              <div>
                <Label>Currency</Label>
                <Select
                  defaultValue="INR"
                  name={fields.currency.name}
                  key={fields.currency.key}
                  onValueChange={(value) => setCurrency(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="INR">Indian Rupees -- INR</SelectItem>
                    <SelectItem value="USD">
                      United States Dollar -- USD
                    </SelectItem>
                    <SelectItem value="EUR">Euro -- EUR</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-red-500">{fields.currency.errors}</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="col-span-2 flex flex-col gap-2 md:col-span-1">
                  <Label>From</Label>
                  <Input
                    name={fields.fromName.name}
                    key={fields.fromName.key}
                    placeholder="Your Name"
                    defaultValue={data.fromName as string}
                  />
                  <p className="text-sm text-red-500">
                    {fields.fromName.errors}
                  </p>
                </div>
                <div className="col-span-2 flex flex-col gap-2 md:col-span-1">
                  <Label>Sender Email</Label>
                  <Input
                    placeholder="Your Email"
                    type="email"
                    name={fields.fromEmail.name}
                    key={fields.fromEmail.key}
                    defaultValue={String(data.fromEmail)}
                  />
                  <p className="text-sm text-red-500">
                    {fields.fromEmail.errors}
                  </p>
                </div>
                <div className="col-span-2 grid gap-4 md:mt-2 md:grid-cols-4">
                  <div className="flex flex-col gap-2">
                    <Label>Street</Label>
                    <Input
                      key={fields.fromStreet.key}
                      name={fields.fromStreet.name}
                      defaultValue={data.fromStreet as string}
                      className="w-full"
                      placeholder="Street/Area"
                    />
                    <p className="-mt-2 ml-3 font-mont text-destructive">
                      {fields.fromStreet.errors}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label>State</Label>
                    <Select
                      name={fields.fromState.name}
                      key={fields.fromState.key}
                      defaultValue={selectedState as string}
                      onValueChange={handleStateChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select State" />
                      </SelectTrigger>
                      <SelectContent>
                        {states.map((state, index) => (
                          <SelectItem key={index} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="-mt-2 ml-3 font-mont text-destructive">
                      {fields.fromPinCode.errors}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label>City</Label>
                    <Select
                      name={fields.fromCity.name}
                      key={fields.fromCity.key}
                      defaultValue={selectedCity}
                      onValueChange={handleCityChange}
                      disabled={!selectedState}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select City" />
                      </SelectTrigger>
                      <SelectContent>
                        {filteredCities.map((label, index) => (
                          <SelectItem key={index} value={label.city}>
                            {label.city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="-mt-2 ml-3 font-mont text-destructive">
                      {fields.fromCity.errors}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>Pin Code</Label>
                    <Input
                      type="number"
                      key={fields.fromPinCode.key}
                      name={fields.fromPinCode.name}
                      defaultValue={data.fromPinCode as number}
                      className="w-full"
                      placeholder="Pin Code "
                    />
                    <p className="-mt-2 ml-3 font-mont text-destructive">
                      {fields.fromPinCode.errors}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label>To</Label>
                <div className="flex flex-col gap-2">
                  <Input
                    name={fields.clientName.name}
                    key={fields.clientName.key}
                    defaultValue={data.clientName as string}
                    placeholder="Client Name"
                  />
                  <p className="text-sm text-red-500">
                    {fields.clientName.errors}
                  </p>
                  <Input
                    name={fields.clientEmail.name}
                    key={fields.clientEmail.key}
                    defaultValue={data.clientEmail?.toString()}
                    placeholder="Client Email"
                  />
                  <p className="text-sm text-red-500">
                    {fields.clientEmail.errors}
                  </p>
                  <Input
                    name={fields.clientAddress.name}
                    key={fields.clientAddress.key}
                    defaultValue={String(data.clientAddress)}
                    placeholder="Client Address"
                  />
                  <p className="text-sm text-red-500">
                    {fields.clientAddress.errors}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label>Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="justify-start text-left"
                      >
                        <CalendarIcon />

                        {selectedDate ? (
                          new Intl.DateTimeFormat('en-IN', {
                            dateStyle: 'long',
                          }).format(selectedDate)
                        ) : (
                          <span>Pick a Date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <Calendar
                        selected={selectedDate}
                        onSelect={(date) =>
                          setSelectedDate(date || new Date())
                        }
                        mode="single"
                        fromDate={new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                  <p className="text-sm text-red-500">{fields.date.errors}</p>
                </div>

                <div className="flex flex-col gap-2">
                  <Label>Invoice Due</Label>
                  <Select
                    name={fields.dueDate.name}
                    key={fields.dueDate.key}
                    defaultValue={data.dueDate?.toString()}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select due date" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Due on Reciept</SelectItem>
                      <SelectItem value="15">Net 15</SelectItem>
                      <SelectItem value="30">Net 30</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-red-500">
                    {fields.dueDate.errors}
                  </p>
                </div>
              </div>
              <div className="grid gap-5 md:grid-cols-3">
                <div className="flex flex-col gap-2">
                  <Label>Quantity</Label>
                  <Input
                    name={fields.invoiceItemQuantity.name}
                    key={fields.invoiceItemQuantity.key}
                    type="number"
                    placeholder="0"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                  <p className="text-sm text-red-500">
                    {fields.invoiceItemQuantity.errors}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Rate</Label>
                  <Input
                    name={fields.invoiceItemRate.name}
                    key={fields.invoiceItemRate.key}
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                    type="number"
                    placeholder="0"
                  />
                  <p className="text-sm text-red-500">
                    {fields.invoiceItemRate.errors}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Amount</Label>
                  <Input
                    value={formatCurrency({
                      amount: calcualteTotal,
                      currency: currency as CurrencySign,
                    })}
                    disabled
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="flex flex-col gap-2">
                <Label>Description</Label>
                <Textarea
                  name={fields.invoiceItemDescription.name}
                  key={fields.invoiceItemDescription.key}
                  defaultValue={data.invoiceItemDescription as string}
                  placeholder="Item name & description"
                />
                <p className="text-sm text-red-500">
                  {fields.invoiceItemDescription.errors}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <Label>Note</Label>
                <Textarea
                  name={fields.note.name}
                  key={fields.note.key}
                  defaultValue={String(data.note)}
                  placeholder="Add your Note/s right here..."
                />
                <p className="text-sm text-red-500">{fields.note.errors}</p>
              </div>

              <Badge
                variant="secondary"
                className="mt-6 flex h-fit w-full flex-col justify-end gap-1 border-2 border-dashed border-muted-foreground bg-muted-foreground/25 px-5 font-jura font-medium"
              >
                <div className="flex h-fit w-full justify-between text-base">
                  <span>Subtotal</span>
                  <span>
                    {formatCurrency({
                      amount: calcualteTotal,
                      currency: currency as CurrencySign,
                    })}
                  </span>
                </div>
                <div className="flex w-full justify-between border-t-2 text-base">
                  <span>Total ({currency})</span>
                  <span className="font-medium underline underline-offset-4">
                    {formatCurrency({
                      amount: calcualteTotal,
                      currency: currency as CurrencySign,
                    })}
                  </span>
                </div>
              </Badge>
            </div>

            <div className="flex items-center justify-center">
              <SubmitButton
                text="Update Invoice"
                loadingText="Updating Invoice..."
              />
            </div>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
}
