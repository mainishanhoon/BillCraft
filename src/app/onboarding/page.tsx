'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Form from 'next/form';
import { useActionState, useState } from 'react';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { OnboardingUserSchema } from '@/lib/zod';
import { OnboardingUserAction } from '@/lib/actions';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ChevronsRight, Loader } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cities } from '@/constants/cities';
import { states } from '@/constants/states';

export default function OnboardingRoute() {
  const [lastResult, formAction, isPending] = useActionState(
    OnboardingUserAction,
    null,
  );

  const [selectedState, setSelectedState] = useState<string>();
  const [filteredCities, setFilteredCities] = useState<
    { city: string; state: string }[]
  >([]);

  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: OnboardingUserSchema });
    },

    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  function handleStateChange(state: string) {
    setSelectedState(state);
    const filtered = cities.filter((city) => city.state === state);
    setFilteredCities(filtered);
  }

  return (
    <div className="flex items-center justify-center p-4 tracking-wide md:h-dvh md:p-0 md:tracking-wider">
      <Card className="max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Your are almost finished!</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form
            id={form.id}
            onSubmit={form.onSubmit}
            action={formAction}
            noValidate
          >
            <div className="flex flex-col gap-5">
              <div className="grid gap-5 md:grid-cols-2 md:gap-2">
                <div className="flex flex-col gap-2">
                  <Label>First Name</Label>
                  <Input
                    type="text"
                    key={fields.firstName.key}
                    name={fields.firstName.name}
                    defaultValue={fields.firstName.initialValue}
                    className="w-full"
                    placeholder="First Name"
                  />
                  <p className="-mt-2 ml-3 font-mont text-destructive">
                    {fields.firstName.errors}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Last Name</Label>
                  <Input
                    type="text"
                    key={fields.lastName.key}
                    name={fields.lastName.name}
                    defaultValue={fields.lastName.initialValue}
                    className="w-full"
                    placeholder="Last Name"
                  />
                  <p className="-mt-2 ml-3 font-mont text-destructive">
                    {fields.lastName.errors}
                  </p>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2 md:gap-2">
                <div className="flex flex-col gap-2">
                  <Label>State</Label>
                  <Select
                    key={fields.state.key}
                    name={fields.state.name}
                    defaultValue={fields.state.initialValue}
                    value={selectedState}
                    onValueChange={(value) => handleStateChange(value)}
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
                    {fields.state.errors}
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <Label>City</Label>
                  <Select
                    key={fields.city.key}
                    name={fields.city.name}
                    defaultValue={fields.city.initialValue}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select City" />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredCities.length > 0 ? (
                        filteredCities.map((label, index) => (
                          <SelectItem key={index} value={label.city}>
                            {label.city}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="Space" disabled>
                          No State Selected
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  <p className="-mt-2 ml-3 font-mont text-destructive">
                    {fields.city.errors}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label>Street</Label>
                <Textarea
                  key={fields.street.key}
                  name={fields.street.name}
                  defaultValue={fields.street.initialValue}
                  className="w-full"
                  placeholder="Street/Area"
                />
                <p className="-mt-2 ml-3 font-mont text-destructive">
                  {fields.street.errors}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <Label>Pin Code</Label>
                <Input
                  type="number"
                  key={fields.pincode.key}
                  name={fields.pincode.name}
                  defaultValue={fields.pincode.initialValue}
                  className="w-full"
                  placeholder="Pin Code "
                />
                <p className="-mt-2 ml-3 font-mont text-destructive">
                  {fields.pincode.errors}
                </p>
              </div>
              {isPending ? (
                <Button
                  disabled
                  variant="outline"
                  className="flex items-center gap-2 text-sm font-medium md:text-base"
                >
                  <Loader
                    size={25}
                    strokeWidth={2.5}
                    className="animate-spin [animation-duration:3s]"
                  />
                  <p>Starting Your Journey...</p>
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant="default"
                  type="submit"
                  className="flex items-center gap-2 text-sm font-medium md:text-base"
                >
                  <p>Start Your Journey</p>
                  <ChevronsRight
                    size={25}
                    strokeWidth={2.5}
                    className="mt-0.5"
                  />
                </Button>
              )}
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
